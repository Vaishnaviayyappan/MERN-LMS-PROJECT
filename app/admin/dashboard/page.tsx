"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, FileText, TrendingUp, Plus } from "lucide-react"
import Link from "next/link"
import { AdminLayout } from "@/components/admin-layout"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 1250,
    totalInstructors: 45,
    totalCourses: 120,
    totalAssignments: 340,
  })

  const [recentActivities] = useState([
    { id: 1, type: "course", message: "New course 'Advanced React' created", time: "2 hours ago" },
    { id: 2, type: "user", message: "25 new students enrolled", time: "4 hours ago" },
    {
      id: 3,
      type: "assignment",
      message: "Assignment 'Database Design' submitted by 45 students",
      time: "6 hours ago",
    },
    { id: 4, type: "course", message: "Course 'Machine Learning Basics' updated", time: "1 day ago" },
  ])

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your institution's learning platform</p>
          </div>
          <div className="flex space-x-2">
            <Link href="/admin/courses/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Instructors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalInstructors}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+3</span> new this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCourses}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8</span> new this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAssignments}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+15</span> new this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest updates from your platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {activity.type === "course" && <BookOpen className="h-5 w-5 text-blue-500" />}
                      {activity.type === "user" && <Users className="h-5 w-5 text-green-500" />}
                      {activity.type === "assignment" && <FileText className="h-5 w-5 text-orange-500" />}
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

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/admin/courses">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <BookOpen className="h-6 w-6 mb-2" />
                    Manage Courses
                  </Button>
                </Link>
                <Link href="/admin/users">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    Manage Users
                  </Button>
                </Link>
                <Link href="/admin/assignments">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <FileText className="h-6 w-6 mb-2" />
                    View Assignments
                  </Button>
                </Link>
                <Link href="/admin/reports">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <TrendingUp className="h-6 w-6 mb-2" />
                    Generate Reports
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
