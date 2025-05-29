"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Award, TrendingUp, Play, FileText } from "lucide-react"
import Link from "next/link"
import { StudentLayout } from "@/components/student-layout"

export default function StudentDashboard() {
  const [enrolledCourses] = useState([
    {
      id: 1,
      title: "Introduction to React",
      instructor: "John Smith",
      progress: 75,
      totalModules: 8,
      completedModules: 6,
      nextLesson: "State Management with Hooks",
      dueAssignments: 2,
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      instructor: "Sarah Johnson",
      progress: 45,
      totalModules: 12,
      completedModules: 5,
      nextLesson: "Async/Await Patterns",
      dueAssignments: 1,
    },
    {
      id: 3,
      title: "Database Design",
      instructor: "Mike Wilson",
      progress: 20,
      totalModules: 6,
      completedModules: 1,
      nextLesson: "Entity Relationship Diagrams",
      dueAssignments: 0,
    },
  ])

  const [recentActivities] = useState([
    { id: 1, type: "assignment", message: "Submitted 'React Components Assignment'", time: "2 hours ago" },
    { id: 2, type: "lesson", message: "Completed 'JavaScript Promises' lesson", time: "1 day ago" },
    { id: 3, type: "grade", message: "Received grade for 'Database Schema Design'", time: "2 days ago" },
    { id: 4, type: "enrollment", message: "Enrolled in 'Database Design' course", time: "3 days ago" },
  ])

  const [upcomingDeadlines] = useState([
    { id: 1, title: "React Final Project", course: "Introduction to React", dueDate: "2024-02-15", priority: "high" },
    { id: 2, title: "JavaScript Quiz", course: "Advanced JavaScript", dueDate: "2024-02-18", priority: "medium" },
    { id: 3, title: "Database ERD Assignment", course: "Database Design", dueDate: "2024-02-22", priority: "low" },
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
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{enrolledCourses.length}</div>
              <p className="text-xs text-muted-foreground">Active learning paths</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Modules</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {enrolledCourses.reduce((acc, course) => acc + course.completedModules, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Out of {enrolledCourses.reduce((acc, course) => acc + course.totalModules, 0)} total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Assignments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {enrolledCourses.reduce((acc, course) => acc + course.dueAssignments, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Due this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length)}
                %
              </div>
              <p className="text-xs text-muted-foreground">Across all courses</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>My Courses</CardTitle>
                <CardDescription>Continue where you left off</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {enrolledCourses.map((course) => (
                    <div key={course.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{course.title}</h3>
                          <p className="text-sm text-gray-600">by {course.instructor}</p>
                        </div>
                        <Badge variant="outline">
                          {course.completedModules}/{course.totalModules} modules
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Next: {course.nextLesson}</p>
                          {course.dueAssignments > 0 && (
                            <p className="text-xs text-orange-600">{course.dueAssignments} assignment(s) due</p>
                          )}
                        </div>
                        <Link href={`/student/courses/${course.id}`}>
                          <Button size="sm">
                            <Play className="h-4 w-4 mr-2" />
                            Continue
                          </Button>
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
            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
                <CardDescription>Don't miss these important dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingDeadlines.map((deadline) => (
                    <div key={deadline.id} className="flex items-start space-x-3">
                      <Clock className="h-4 w-4 text-gray-400 mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-sm font-medium">{deadline.title}</p>
                            <p className="text-xs text-gray-600">{deadline.course}</p>
                            <p className="text-xs text-gray-500">
                              Due: {new Date(deadline.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className={getPriorityColor(deadline.priority)}>{deadline.priority}</Badge>
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
                <CardDescription>Your latest learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        {activity.type === "assignment" && <FileText className="h-4 w-4 text-blue-500" />}
                        {activity.type === "lesson" && <Play className="h-4 w-4 text-green-500" />}
                        {activity.type === "grade" && <Award className="h-4 w-4 text-purple-500" />}
                        {activity.type === "enrollment" && <BookOpen className="h-4 w-4 text-orange-500" />}
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
    </StudentLayout>
  )
}
