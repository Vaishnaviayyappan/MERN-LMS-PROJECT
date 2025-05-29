"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Search, Users, Clock, Star, Play } from "lucide-react"
import Link from "next/link"
import { StudentLayout } from "@/components/student-layout"

export default function StudentCoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [activeTab, setActiveTab] = useState("enrolled")

  const [enrolledCourses] = useState([
    {
      id: 1,
      title: "Introduction to React",
      instructor: "John Smith",
      category: "Programming",
      progress: 75,
      totalModules: 8,
      completedModules: 6,
      rating: 4.8,
      students: 1250,
      duration: "8 weeks",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "Sarah Johnson",
      category: "Programming",
      progress: 45,
      totalModules: 12,
      completedModules: 5,
      rating: 4.7,
      students: 890,
      duration: "10 weeks",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Database Design",
      instructor: "Mike Wilson",
      category: "Database",
      progress: 20,
      totalModules: 6,
      completedModules: 1,
      rating: 4.6,
      students: 650,
      duration: "6 weeks",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ])

  const [availableCourses] = useState([
    {
      id: 4,
      title: "Machine Learning Basics",
      instructor: "Emily Davis",
      category: "AI/ML",
      rating: 4.9,
      students: 2100,
      duration: "12 weeks",
      price: "Free",
      level: "Beginner",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "UI/UX Design Fundamentals",
      instructor: "Alex Chen",
      category: "Design",
      rating: 4.8,
      students: 1800,
      duration: "8 weeks",
      price: "Free",
      level: "Beginner",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "Python for Data Science",
      instructor: "Lisa Wang",
      category: "Data Science",
      rating: 4.7,
      students: 1500,
      duration: "10 weeks",
      price: "Free",
      level: "Intermediate",
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ])

  const currentCourses = activeTab === "enrolled" ? enrolledCourses : availableCourses

  const filteredCourses = currentCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || course.category.toLowerCase() === filterCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600">Manage your learning journey</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("enrolled")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "enrolled" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Enrolled Courses ({enrolledCourses.length})
          </button>
          <button
            onClick={() => setActiveTab("available")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "available" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Available Courses
          </button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="programming">Programming</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="data science">Data Science</SelectItem>
                  <SelectItem value="ai/ml">AI/ML</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-100 rounded-t-lg overflow-hidden">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="outline">{course.category}</Badge>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    {course.rating}
                  </div>
                </div>
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <CardDescription>by {course.instructor}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeTab === "enrolled" && "progress" in course && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                      <p className="text-xs text-gray-600">
                        {course.completedModules}/{course.totalModules} modules completed
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.students.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                  </div>

                  {activeTab === "available" && "price" in course && (
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">{course.level}</Badge>
                      <span className="font-semibold text-green-600">{course.price}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    {activeTab === "enrolled" ? (
                      <Link href={`/student/courses/${course.id}`} className="w-full">
                        <Button className="w-full">
                          <Play className="h-4 w-4 mr-2" />
                          Continue Learning
                        </Button>
                      </Link>
                    ) : (
                      <Button className="w-full">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Enroll Now
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600">
                {searchTerm || filterCategory !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : activeTab === "enrolled"
                    ? "You haven't enrolled in any courses yet"
                    : "No courses available at the moment"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </StudentLayout>
  )
}
