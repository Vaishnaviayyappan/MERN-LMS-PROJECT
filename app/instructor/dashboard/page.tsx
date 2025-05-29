"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, FileText, TrendingUp, MessageSquare, Clock } from "lucide-react"
import Link from "next/link"
import { InstructorLayout } from "@/components/instructor-layout"

export default function InstructorDashboard() {
  const [stats] = useState({
    totalCourses: 4,
    totalStudents: 156,
    pendingAssignments: 23,
    averageRating: 4.7,
  })

  const [myCourses] = useState([
    {
      id: 1,
      title: "Introduction to React",
      students: 45,
      modules: 8,
      pendingAssignments: 12,
      rating: 4.8,
      status: "active",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      students: 32,
      modules: 12,
      pendingAssignments: 8,
      rating: 4.7,
      status: "active",
    },
    {
      id: 3,
      title: "Node.js Fundamentals",
      students: 28,
      modules: 10,
      pendingAssignments: 3,
      rating: 4.6,
      status: "active",
    },
    {
      id: 4,
      title: "Full Stack Development",
      students: 51,
      modules: 15,
      pendingAssignments: 0,
      rating: 4.9,
      status: "draft",
    },
  ])

  const [recentActivities] = useState([
    {
      id: 1,
      type: "submission",
      message: "New assignment submission in 'Introduction to React'",
      time: "30 minutes ago",
    },
    { id: 2, type: "question", message: "Student question in 'Advanced JavaScript' discussion", time: "2 hours ago" },
    { id: 3, type: "completion", message: "5 students completed 'Node.js Basics' module", time: "4 hours ago" },
    { id: 4, type: "enrollment", message: "3 new students enrolled in 'Introduction to React'", time: "1 day ago" },
  ])

  const [pendingTasks] = useState([
    { id: 1, task: "Grade React Final Projects", course: "Introduction to React", count: 12, priority: "high" },
    { id: 2, task: "Review JavaScript Assignments", course: "Advanced JavaScript", count: 8, priority: "medium" },
    { id: 3, task: "Update Course Materials", course: "Node.js Fundamentals", count: 1, priority: "low" },
    { id: 4, task: "Respond to Student Questions", course: "All Courses", count: 5, priority: "medium" },
  ])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <InstructorLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Instructor Dashboard</h1>
          <p className="text-gray-600">Manage your courses and track student progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCourses}</div>
              <p className="text-xs text-muted-foreground">Active learning paths</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Across all courses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingAssignments}</div>
              <p className="text-xs text-muted-foreground">Assignments to grade</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating}</div>
              <p className="text-xs text-muted-foreground">Student feedback</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>My Courses</CardTitle>
                    <CardDescription>Manage your teaching portfolio</CardDescription>
                  </div>
                  <Link href="/instructor/courses">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myCourses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{course.title}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{course.students} students</span>
                            <span>{course.modules} modules</span>
                            <span>★ {course.rating}</span>
                          </div>
                        </div>
                        <Badge variant={course.status === "active" ? "default" : "secondary"}>{course.status}</Badge>
                      </div>

                      {course.pendingAssignments > 0 && (
                        <div className="bg-orange-50 border border-orange-200 rounded-md p-3">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 text-orange-600 mr-2" />
                            <span className="text-sm text-orange-800">
                              {course.pendingAssignments} assignments pending review
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex space-x-2">
                        <Link href={`/instructor/courses/${course.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">
                            Manage Course
                          </Button>
                        </Link>
                        <Link href={`/instructor/courses/${course.id}/assignments`}>
                          <Button size="sm">Grade Assignments</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pending Tasks */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Tasks</CardTitle>
                <CardDescription>Items requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="flex items-start space-x-3">
                      <Clock className="h-4 w-4 text-gray-400 mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium">{task.task}</p>
                            <p className="text-xs text-gray-600">{task.course}</p>
                            <p className="text-xs text-gray-500">{task.count} item(s)</p>
                          </div>
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {activity.type === "submission" && <FileText className="h-4 w-4 text-blue-500" />}
                        {activity.type === "question" && <MessageSquare className="h-4 w-4 text-green-500" />}
                        {activity.type === "completion" && <BookOpen className="h-4 w-4 text-purple-500" />}
                        {activity.type === "enrollment" && <Users className="h-4 w-4 text-orange-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </InstructorLayout>
  )
}
