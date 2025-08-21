"use client"

import { useState } from "react"
import {
  Search,
  ShoppingCart,
  ArrowLeft,
  Calendar,
  Users,
  MessageCircle,
  ChevronDown,
  Menu,
  X,
  Plus,
  Home,
  UserCheck,
  CalendarDays,
  FolderPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Import data from JSON files
import projectsData from "@/data/projects.json"
import eventsData from "@/data/events.json"
import membersData from "@/data/members.json"
import sidebarItemsData from "@/data/sidebar.json"

export default function ProjectDashboard() {
  const [activeNavItem, setActiveNavItem] = useState("Home")
  const [searchQuery, setSearchQuery] = useState("")
  const [projectSearchQuery, setProjectSearchQuery] = useState("")
  const [sortByDate, setSortByDate] = useState("newest")
  const [sortByStatus, setSortByStatus] = useState("all")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [showAddProject, setShowAddProject] = useState(false)
  const [newProject, setNewProject] = useState({
    title: "",
    startDate: "",
    dueDate: "",
    description: "",
    techStack: "",
    members: [],
  })

  // Process imported data to match original structure
  const allProjects = projectsData.map(project => ({
    ...project,
    dateSort: new Date(project.dateSort)
  }))

  const upcomingEvents = eventsData
  const communityMembers = membersData

  const sidebarItems = sidebarItemsData.map(item => ({
    ...item,
    icon: (() => {
      switch(item.icon) {
        case "Home": return Home;
        case "FolderPlus": return FolderPlus;
        case "Users": return Users;
        case "CalendarDays": return CalendarDays;
        case "UserCheck": return UserCheck;
        default: return Home;
      }
    })(),
    active: false
  }))

  const filteredAndSortedProjects = allProjects
    .filter(
      (project) =>
        project.title.toLowerCase().includes(projectSearchQuery.toLowerCase()) &&
        (sortByStatus === "all" || project.status.toLowerCase() === sortByStatus.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortByDate === "newest") {
        return b.dateSort.getTime() - a.dateSort.getTime()
      } else {
        return a.dateSort.getTime() - b.dateSort.getTime()
      }
    })

  const handleNavigation = (itemName: string) => {
    setActiveNavItem(itemName)
    if (itemName === "Add Project") {
      setShowAddProject(true)
    } else {
      setShowAddProject(false)
    }
  }

  const handleCreateProject = () => {
    if (newProject.title && newProject.dueDate && newProject.startDate) {
      // In a real app, this would save to database
      console.log("Creating project:", newProject)
      setNewProject({
        title: "",
        startDate: "",
        dueDate: "",
        description: "",
        techStack: "",
        members: [],
      })
      setShowAddProject(false)
      setActiveNavItem("Projects")
    }
  }

  const renderHomeView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-2xl font-bold text-gray-900">{allProjects.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-gray-900">
                  {allProjects.filter((p) => p.status === "Planned").length}
                </p>
              </div>
              <FolderPlus className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingEvents.length}</p>
              </div>
              <CalendarDays className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team Members</p>
                <p className="text-2xl font-bold text-gray-900">{communityMembers.length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Recent Projects</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            {allProjects.slice(0, 3).map((project, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{project.title}</p>
                  <p className="text-sm text-gray-600">{project.status}</p>
                </div>
                <Badge variant="secondary">{project.progress}%</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Upcoming Events</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.slice(0, 3).map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{event.title}</p>
                  <p className="text-sm text-gray-600">
                    {event.date} at {event.time}
                  </p>
                </div>
                <Badge variant="outline">{event.attendees} attendees</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderAddProjectView = () => (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Add New Project</h2>
          <p className="text-gray-600">Create a new project with all the necessary details</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              placeholder="Enter project title"
              value={newProject.title}
              onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={newProject.startDate}
                onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={newProject.dueDate}
                onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your project"
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="techStack">Tech Stack</Label>
            <Input
              id="techStack"
              placeholder="e.g., React, Node.js, MongoDB"
              value={newProject.techStack}
              onChange={(e) => setNewProject({ ...newProject, techStack: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Project Members</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select team members" />
              </SelectTrigger>
              <SelectContent>
                {communityMembers.map((member, index) => (
                  <SelectItem key={index} value={member.name}>
                    {member.name} - {member.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={handleCreateProject} className="flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
            <Button variant="outline" onClick={() => setShowAddProject(false)} className="flex-1">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderProjectsView = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search projects..."
              className="pl-10 bg-white border-gray-200"
              value={projectSearchQuery}
              onChange={(e) => setProjectSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent justify-start sm:justify-center">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Sort By Date</span>
                <span className="sm:hidden">Date: {sortByDate === "newest" ? "Newest" : "Oldest"}</span>
                <ChevronDown className="h-4 w-4 ml-auto sm:ml-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortByDate("newest")}>Newest First</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortByDate("oldest")}>Oldest First</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-transparent justify-start sm:justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="hidden sm:inline">Sort By Status</span>
                <span className="sm:hidden">Status: {sortByStatus === "all" ? "All" : sortByStatus}</span>
                <ChevronDown className="h-4 w-4 ml-auto sm:ml-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortByStatus("all")}>All Status</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortByStatus("planned")}>Planned</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortByStatus("in progress")}>In Progress</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortByStatus("completed")}>Completed</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {filteredAndSortedProjects.length > 0 ? (
          filteredAndSortedProjects.map((project, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-gray-900 text-sm lg:text-base">{project.title}</h3>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs">
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>Author:</strong> {project.author}
                  </p>
                  <p>
                    <strong>Description:</strong> {project.description}
                  </p>
                  <p>
                    <strong>Tech Stack:</strong> {project.techStack}
                  </p>
                  <p>
                    <strong>Due Date:</strong> {project.dueDate}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs lg:text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 lg:h-4 lg:w-4" />
                    {project.members}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3 lg:h-4 lg:w-4" />
                    {project.comments}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs lg:text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-blue-600">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {project.memberAvatars.slice(0, 5).map((avatar, avatarIndex) => (
                      <Avatar key={avatarIndex} className="w-6 h-6 lg:w-8 lg:h-8 border-2 border-white">
                        <AvatarImage src={avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs bg-gray-200">
                          {String.fromCharCode(65 + avatarIndex)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.members > 5 && (
                      <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-blue-600 text-white text-xs font-medium flex items-center justify-center border-2 border-white">
                        +{project.members - 5}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No projects found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  )

  const renderEventsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Upcoming Events</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingEvents.map((event, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-gray-900">{event.title}</h3>
                <Badge variant="outline">{event.project}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                {event.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                {event.attendees} attendees
              </div>
              <div className="text-sm font-medium text-blue-600">{event.time}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderCommunityView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Company Members</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {communityMembers.map((member, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <Avatar className="w-16 h-16 mx-auto">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    member.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-gray-600 mb-1">{member.role}</p>
              <p className="text-xs text-gray-500">{member.department}</p>
              <Badge variant={member.status === "online" ? "default" : "secondary"} className="mt-2">
                {member.status}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderContent = () => {
    if (showAddProject || activeNavItem === "Add Project") {
      return renderAddProjectView()
    }

    switch (activeNavItem) {
      case "Home":
        return renderHomeView()
      case "Projects":
        return renderProjectsView()
      case "Events":
        return renderEventsView()
      case "Community":
        return renderCommunityView()
      default:
        return renderHomeView()
    }
  }

  const getPageTitle = () => {
    if (showAddProject || activeNavItem === "Add Project") {
      return "Add New Project"
    }
    return activeNavItem
  }

  const getPageDescription = () => {
    switch (activeNavItem) {
      case "Home":
        return "Welcome to your project management dashboard. Get an overview of all your projects, events, and team members."
      case "Add Project":
        return "Create a new project with all the necessary details including timeline, team members, and technical requirements."
      case "Projects":
        return "Manage all your projects in one place. View project details, track progress, and collaborate with your team."
      case "Events":
        return "Stay updated with upcoming project events, meetings, and important deadlines across all your projects."
      case "Community":
        return "Connect with your team members, view their roles, and see who's currently online and available."
      default:
        return "Welcome to your project management dashboard."
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-sm border-r transition-transform duration-300 ease-in-out`}
      >
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/images/woffice-logo.png" alt="Woffice" className="w-8 h-8" />
              <span className="text-xl font-semibold text-gray-800">office</span>
            </div>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Button
                key={item.name}
                variant={activeNavItem === item.name ? "default" : "ghost"}
                className={`w-full justify-start gap-3 ${
                  activeNavItem === item.name
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
                onClick={() => handleNavigation(item.name)}
              >
                <IconComponent className="h-5 w-5" />
                {item.name}
              </Button>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden lg:flex">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 max-w-md mx-4 lg:mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search..."
                  className="pl-10 bg-gray-50 border-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden lg:flex">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {/* Page Title and Description */}
            <div className="mb-6 lg:mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{getPageTitle()}</h1>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">{getPageDescription()}</p>
            </div>

            {/* Dynamic Content */}
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}