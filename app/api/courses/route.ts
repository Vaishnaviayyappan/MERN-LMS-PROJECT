import { type NextRequest, NextResponse } from "next/server"

// Mock data for demonstration
const mockCourses = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the fundamentals of React including components, state, and props.",
    instructor: "John Smith",
    category: "Programming",
    duration: "8 weeks",
    difficulty: "Beginner",
    students: 1250,
    rating: 4.8,
    modules: [
      { id: 1, title: "Getting Started with React", order: 1 },
      { id: 2, title: "Components and JSX", order: 2 },
      { id: 3, title: "State and Props", order: 3 },
    ],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    let filteredCourses = mockCourses

    if (category && category !== "all") {
      filteredCourses = filteredCourses.filter((course) => course.category.toLowerCase() === category.toLowerCase())
    }

    if (search) {
      filteredCourses = filteredCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(search.toLowerCase()) ||
          course.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    return NextResponse.json({
      success: true,
      courses: filteredCourses,
      total: filteredCourses.length,
    })
  } catch (error) {
    console.error("Courses fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const courseData = await request.json()

    // In a real application, you would:
    // 1. Validate the course data
    // 2. Save to database
    // 3. Handle file uploads for thumbnails
    // 4. Send notifications to relevant users

    const newCourse = {
      id: mockCourses.length + 1,
      ...courseData,
      students: 0,
      rating: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockCourses.push(newCourse)

    return NextResponse.json({
      success: true,
      course: newCourse,
      message: "Course created successfully",
    })
  } catch (error) {
    console.error("Course creation error:", error)
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 })
  }
}
