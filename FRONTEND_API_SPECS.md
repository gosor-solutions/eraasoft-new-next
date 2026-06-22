# Frontend API Specs — Client Auth & Free Courses

Base URL: `{{base_url}}` (e.g. `http://localhost:8000/api`)

---

## Table of Contents

1. [Auth & Conventions](#auth--conventions)
2. [Client Auth Endpoints](#client-auth-endpoints)
   - [Register](#1-register)
   - [Login](#2-login)
   - [Get Profile](#3-get-profile)
   - [Update Profile](#4-update-profile)
   - [Logout](#5-logout)
3. [Free Courses Endpoints](#free-courses-endpoints)
   - [List Free Courses](#6-list-free-courses)
   - [Get Free Course Detail](#7-get-free-course-detail)
4. [Home Endpoint (Updated)]#home-endpoint-updated)
5. [Error Responses](#error-responses)
6. [Type Definitions](#type-definitions)

---

## Auth & Conventions

### Response Wrapper

All API responses use this envelope:

```
Success (single item):
{ "success": true, "message": "...", "data": { ... } }

Success (paginated list):
{ "success": true, "message": "...", "data": [ ... ], "meta": { ... }, "links": { ... } }

Error:
{ "success": false, "message": "..." }

Validation Error:
{ "success": false, "message": "Validation Error", "errors": { "field": ["message"] } }
```

### Authentication

| Item | Value |
|------|-------|
| Type | Bearer Token (Laravel Sanctum) |
| Header | `Authorization: Bearer <token>` |
| Token source | Returned in `data.token` from Register/Login |
| Token lifetime | No expiry (until revoked via Logout) |

### Endpoints requiring auth

All endpoints marked with **[Auth]** require the `Authorization: Bearer <token>` header.
Without it → `401 { "success": false, "message": "Unauthorized" }`

---

## Client Auth Endpoints

### 1. Register

Creates a new client account and returns an auth token.

```
POST /client/register
```

**Rate limit:** 5 requests per minute

**Headers:**
```
Content-Type: application/json
```

**Request Body (JSON):**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `first_name` | string | yes | max 100 |
| `last_name` | string | yes | max 100 |
| `email` | string | yes | valid email, unique in clients table |
| `phone` | string | no | max 30 |
| `password` | string | yes | min 8 chars |
| `password_confirmation` | string | yes | must match `password` |

**Request Example:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "01012345678",
  "password": "password123",
  "password_confirmation": "password123"
}
```

**Response — `201 Created`:**
```json
{
  "success": true,
  "message": "Client registered successfully",
  "data": {
    "client": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "full_name": "John Doe",
      "email": "john@example.com",
      "phone": "01012345678",
      "avatar": null,
      "bio": null,
      "email_verified_at": null,
      "last_activity": null,
      "created_at": "2026-06-22T12:00:00.000000Z"
    },
    "token": "1|abcdef1234567890abcdef1234567890abcdef1234567890"
  }
}
```

> **Frontend action:** Store `data.token` (localStorage/cookie). Store `data.client` in auth state. Redirect to home/dashboard.

---

### 2. Login

Authenticates a client and returns an auth token.

```
POST /client/login
```

**Rate limit:** 5 requests per minute

**Headers:**
```
Content-Type: application/json
```

**Request Body (JSON):**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `email` | string | yes | valid email |
| `password` | string | yes | min 8 chars |

**Request Example:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response — `200 OK`:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "client": {
      "id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "full_name": "John Doe",
      "email": "john@example.com",
      "phone": "01012345678",
      "avatar": null,
      "bio": null,
      "email_verified_at": null,
      "last_activity": null,
      "created_at": "2026-06-22T12:00:00.000000Z"
    },
    "token": "2|xyz1234567890xyz1234567890xyz1234567890xyz1234567890"
  }
}
```

**Error — `422 Unprocessable Entity` (wrong credentials):**
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": {
    "email": ["بيانات الاعتماد هذه غير متطابقة مع سجلاتنا."]
  }
}
```

**Error — `422` (blocked account):**
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": {
    "email": ["حسابك محظور، يرجى التواصل مع الإدارة."]
  }
}
```

> **Frontend action:** Store `data.token`. Store `data.client` in auth state. Redirect to home/dashboard.

---

### 3. Get Profile

**[Auth]** Returns the authenticated client's profile.

```
GET /client/profile
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response — `200 OK`:**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "01012345678",
    "avatar": "http://localhost:8000/storage/avatars/abc123.jpg",
    "bio": "Software developer",
    "email_verified_at": "2026-06-22T12:00:00.000000Z",
    "last_activity": "2026-06-22T14:30:00.000000Z",
    "created_at": "2026-06-22T12:00:00.000000Z"
  }
}
```

---

### 4. Update Profile

**[Auth]** Updates the authenticated client's profile. All fields are optional (partial updates supported).

```
PUT /client/profile
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

> **Important:** Use `multipart/form-data` (not JSON) because this endpoint supports avatar file upload.

**Request Body (form-data):**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `first_name` | string | no | max 100 |
| `last_name` | string | no | max 100 |
| `email` | string | no | valid email, unique (ignores self) |
| `phone` | string | no | max 30 |
| `bio` | string | no | — |
| `avatar` | file | no | image: jpg, jpeg, png, webp; max 5MB |
| `password` | string | no | min 8 chars |
| `password_confirmation` | string | only if `password` present | must match `password` |

**Request Example (form-data):**
```
first_name=John
last_name=Updated
phone=01098765432
bio=Updated bio text
password=newpassword123
password_confirmation=newpassword123
avatar=<file>
```

**Response — `200 OK`:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "first_name": "John",
    "last_name": "Updated",
    "full_name": "John Updated",
    "email": "john@example.com",
    "phone": "01098765432",
    "avatar": "http://localhost:8000/storage/avatars/new123.jpg",
    "bio": "Updated bio text",
    "email_verified_at": null,
    "last_activity": null,
    "created_at": "2026-06-22T12:00:00.000000Z"
  }
}
```

> **Frontend action:** Update auth state with `data`. If `password` was changed, the old token remains valid (no need to re-login).

---

### 5. Logout

**[Auth]** Revokes the current API token. The token becomes invalid immediately.

```
POST /client/logout
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response — `200 OK`:**
```json
{
  "success": true,
  "message": "Logged out successfully",
  "data": null
}
```

> **Frontend action:** Clear stored token from localStorage/cookie. Clear auth state. Redirect to login page.

---

## Free Courses Endpoints

> **All Free Courses endpoints require authentication.**

### 6. List Free Courses

**[Auth]** Returns a paginated list of published free courses.

```
GET /free-courses
```

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
| Param | Type | Default | Description |
|-------|------|---------|-------------|
| `search` | string | empty | Search in title, short_description, description |
| `per_page` | integer | 12 | Items per page |

**Request Example:**
```
GET /free-courses?search=laravel&per_page=12
```

**Response — `200 OK`:**
```json
{
  "success": true,
  "message": "Free courses retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "Basic Laravel Course",
      "slug": "basic-laravel",
      "short_description": "Learn Laravel from scratch",
      "image": "http://localhost:8000/storage/free-courses/abc.webp",
      "background_image": "http://localhost:8000/storage/free-courses/bg.webp",
      "is_featured": true,
      "videos_count": 5
    }
  ],
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 3,
    "per_page": 12,
    "to": 12,
    "total": 30
  },
  "links": {
    "first": "http://localhost:8000/api/free-courses?page=1",
    "last": "http://localhost:8000/api/free-courses?page=3",
    "prev": null,
    "next": "http://localhost:8000/api/free-courses?page=2"
  }
}
```

---

### 7. Get Free Course Detail

**[Auth]** Returns full details of a single free course, including all videos and SEO metadata.

```
GET /free-courses/{slug}
```

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `slug` | string | The course slug (e.g. `basic-laravel`) |

**Response — `200 OK`:**
```json
{
  "success": true,
  "message": "Free course details retrieved successfully",
  "data": {
    "id": 1,
    "title": "Basic Laravel Course",
    "slug": "basic-laravel",
    "short_description": "Learn Laravel from scratch",
    "description": "<p>Full course description...</p>",
    "image": "http://localhost:8000/storage/free-courses/abc.webp",
    "background_image": "http://localhost:8000/storage/free-courses/bg.webp",
    "is_featured": true,
    "videos": [
      {
        "id": 1,
        "title": "Introduction to Laravel",
        "url": "https://www.youtube.com/watch?v=abc123",
        "order": 0,
        "duration": "12:30"
      },
      {
        "id": 2,
        "title": "Routing in Laravel",
        "url": "https://www.youtube.com/watch?v=def456",
        "order": 1,
        "duration": "15:45"
      }
    ],
    "seo": {
      "meta_title": "Basic Laravel Course - Eraasoft",
      "meta_description": "Learn Laravel from scratch...",
      "focus_keyword": "laravel course",
      "canonical_url": null,
      "robots_index": true,
      "robots_follow": true,
      "keywords": "laravel, php, framework",
      "og_data": {
        "title": "Basic Laravel Course - Eraasoft",
        "description": "Learn Laravel from scratch...",
        "image": "http://localhost:8000/storage/free-courses/abc.webp",
        "type": "website"
      }
    }
  }
}
```

**Error — `404 Not Found` (invalid slug):**
```json
{
  "success": false,
  "message": "Free course not found"
}
```

> **Frontend note:** Videos are sorted by `order` ascending. YouTube URLs can be `watch?v=`, `youtu.be/`, or embed format — convert to embed URL for iframe playback: `https://www.youtube.com/embed/<video_id>`.

---

## Home Endpoint (Updated)

The existing `/home` endpoint now includes a `freeCourses` field:

```
GET /home
```

**No auth required.**

**Response — `200 OK` (freeCourses section only):**
```json
{
  "success": true,
  "message": "Home data retrieved successfully",
  "data": {
    "courses": [ ... ],
    "testimonials": [ ... ],
    "team": [ ... ],
    "articles": [ ... ],
    "faqs": [ ... ],
    "studentProjects": [ ... ],
    "freeCourses": [
      {
        "id": 1,
        "title": "Basic Laravel Course",
        "slug": "basic-laravel",
        "short_description": "Learn Laravel from scratch",
        "image": "http://localhost:8000/storage/free-courses/abc.webp",
        "background_image": "http://localhost:8000/storage/free-courses/bg.webp",
        "is_featured": true,
        "videos_count": 5
      }
    ]
  }
}
```

> Free courses on home are sorted: featured first, then by newest. Max 6 items.

---

## Error Responses

### 401 Unauthorized (missing/invalid token)
```json
{ "success": false, "message": "Unauthorized" }
```

### 404 Not Found
```json
{ "success": false, "message": "Not Found" }
```

### 422 Validation Error
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": {
    "email": ["The email has already been taken."],
    "password": ["The password must be at least 8 characters."]
  }
}
```

### 429 Too Many Requests (rate limited)
```json
{ "success": false, "message": "Too Many Requests" }
```

---

## Type Definitions

### Client
```typescript
interface Client {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;        // first_name + " " + last_name
  email: string;
  phone: string | null;
  avatar: string | null;    // full URL or null
  bio: string | null;
  email_verified_at: string | null;  // ISO datetime
  last_activity: string | null;      // ISO datetime
  created_at: string;                // ISO datetime
}
```

### Auth Response
```typescript
interface AuthResponse {
  success: true;
  message: string;
  data: {
    client: Client;
    token: string;
  };
}
```

### Free Course (list item)
```typescript
interface FreeCourseListItem {
  id: number;
  title: string;
  slug: string;
  short_description: string | null;
  image: string | null;           // full URL or null
  background_image: string | null; // full URL or null
  is_featured: boolean;
  videos_count: number;            // only present when videos loaded
}
```

### Free Course (detail)
```typescript
interface FreeCourseDetail {
  id: number;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  image: string | null;
  background_image: string | null;
  is_featured: boolean;
  videos: FreeCourseVideo[];
  seo: SeoMeta | null;
}
```

### Free Course Video
```typescript
interface FreeCourseVideo {
  id: number;
  title: string;
  url: string;        // YouTube URL
  order: number;
  duration: string | null;  // e.g. "12:30"
}
```

### Seo Meta
```typescript
interface SeoMeta {
  meta_title: string | null;
  meta_description: string | null;
  focus_keyword: string | null;
  canonical_url: string | null;
  robots_index: boolean;
  robots_follow: boolean;
  keywords: string | null;
  og_data: {
    title: string | null;
    description: string | null;
    image: string | null;
    type: string;  // "website" or "article"
  };
}
```

### Paginated Response
```typescript
interface PaginatedResponse<T> {
  success: true;
  message: string;
  data: T[];
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    per_page: number;
    to: number | null;
    total: number;
  };
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}
```

---

## Quick Reference — All Endpoints

| # | Method | Endpoint | Auth | Description |
|---|--------|----------|------|-------------|
| 1 | POST | `/client/register` | No | Register new client |
| 2 | POST | `/client/login` | No | Login, get token |
| 3 | GET | `/client/profile` | Yes | Get current client profile |
| 4 | PUT | `/client/profile` | Yes | Update profile (multipart) |
| 5 | POST | `/client/logout` | Yes | Revoke current token |
| 6 | GET | `/free-courses` | Yes | List free courses (paginated) |
| 7 | GET | `/free-courses/{slug}` | Yes | Get free course detail + videos |
| — | GET | `/home` | No | Home data (now includes `freeCourses`) |
