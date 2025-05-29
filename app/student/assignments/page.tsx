"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Upload, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { StudentLayout } from "@/components/student-layout"
import { useToast } from "@/hooks/use-toast"

export default function StudentAssignmentsPage() {
  const { toast } = useToast()
  const [assignments] = useState([
    {
      id: 1,
      title: "React Components Assignment",
      course: "Introduction to React",
      description: "Create a set of reusable React components including a header, footer, and navigation menu.",
      dueDate: "2024-02-15",
      status: "pending",
      maxPoints: 100,
      submittedAt: null,
      feedback: null,
      grade: null,
    },
    {
      id: 2,
      title: "JavaScript Promises Quiz",
      course: "Advanced JavaScript",
      description: "Complete the online quiz covering async/await, promises, and error handling.",
      dueDate: "2024-02-18",
      status: "pending",
      maxPoints: 50,
      submittedAt: null,
      feedback: null,
      grade: null,
    },
    {
      id: 3,
      title: "Database Schema Design",
      course: "Database Design",
      description: "Design a normalized database schema for an e-commerce application.",
      dueDate: "2024-02-10",
      status: "graded",
      maxPoints: 75,
      submittedAt: "2024-02-09",
      feedback: "Excellent work on normalization. Consider adding indexes for better performance.",
      grade: 68,
    },
    {
      id: 4,
      title: "Final Project Proposal",
      course: "Introduction to React",
      description: "Submit a detailed proposal for your final project including wireframes and technical requirements.",
      dueDate: "2024-02-22",
      status: "submitted",
      maxPoints: 25,
      submittedAt: "2024-02-20",
      feedback: null,
      grade: null,
    },
  ])

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [submissionText, setSubmissionText] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "submitted":
        return "bg-blue-100 text-blue-800"
      case "graded":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "submitted":
        return <CheckCircle className="h-4 w-4" />
      case "graded":
        return <CheckCircle className="h-4 w-4" />
      case "overdue":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleSubmission = async (assignmentId: number) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Assignment submitted",
        description: "Your assignment has been submitted successfully!",
      })

      // Reset form
      setSelectedFile(null)
      setSubmissionText("")
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    }
  }

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date()
  }

  return (
    <StudentLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
          <p className="text-gray-600">Track and submit your course assignments</p>
        </div>

        {/* Assignment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold">{assignments.filter((a) => a.status === "pending").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Submitted</p>
                  <p className="text-2xl font-bold">{assignments.filter((a) => a.status === "submitted").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Graded</p>
                  <p className="text-2xl font-bold">{assignments.filter((a) => a.status === "graded").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold">
                    {assignments.filter((a) => a.status === "pending" && isOverdue(a.dueDate)).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <CardDescription>{assignment.course}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(assignment.status)}>
                      {getStatusIcon(assignment.status)}
                      <span className="ml-1">{assignment.status}</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">{assignment.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      Max Points: {assignment.maxPoints}
                    </div>
                    {assignment.submittedAt && (
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Submitted: {new Date(assignment.submittedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  {assignment.status === "graded" && (
                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-green-800">Grade</span>
                        <span className="text-lg font-bold text-green-800">
                          {assignment.grade}/{assignment.maxPoints}
                        </span>
                      </div>
                      {assignment.feedback && (
                        <div>
                          <p className="text-sm font-medium text-green-800 mb-1">Feedback:</p>
                          <p className="text-sm text-green-700">{assignment.feedback}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex space-x-2">
                    {assignment.status === "pending" && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>
                            <Upload className="h-4 w-4 mr-2" />
                            Submit Assignment
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Submit Assignment</DialogTitle>
                            <DialogDescription>Upload your assignment files and add any comments</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="file">Upload File</Label>
                              <Input
                                id="file"
                                type="file"
                                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="comments">Comments (Optional)</Label>
                              <Textarea
                                id="comments"
                                placeholder="Add any comments about your submission..."
                                value={submissionText}
                                onChange={(e) => setSubmissionText(e.target.value)}
                                rows={3}
                              />
                            </div>

                            <Button
                              onClick={() => handleSubmission(assignment.id)}
                              className="w-full"
                              disabled={!selectedFile}
                            >
                              Submit Assignment
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}

                    {assignment.status === "submitted" && (
                      <Button variant="outline" disabled>
                        Awaiting Grade
                      </Button>
                    )}

                    {assignment.status === "graded" && <Button variant="outline">View Submission</Button>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </StudentLayout>
  )
}
