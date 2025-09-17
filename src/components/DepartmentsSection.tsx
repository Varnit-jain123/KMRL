import { useState } from "react";
import { Users, User, Mail, Phone, MapPin, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface DepartmentsSectionProps {}

// Mock departments data
const departments = [
  {
    id: "dept1",
    name: "Engineering Department",
    description: "Responsible for metro system design, construction, and technical operations",
    head: "Dr. Rajesh Kumar",
    location: "Technical Building - Floor 3",
    memberCount: 45,
    members: [
      {
        id: "emp1",
        name: "Dr. Rajesh Kumar",
        role: "Chief Engineer",
        email: "rajesh.kumar@kmrl.com",
        phone: "+91 9876543210",
        avatar: "",
        isHead: true
      },
      {
        id: "emp2", 
        name: "Priya Nair",
        role: "Senior Design Engineer",
        email: "priya.nair@kmrl.com",
        phone: "+91 9876543211",
        avatar: "",
        isHead: false
      },
      {
        id: "emp3",
        name: "Arjun Menon",
        role: "Project Engineer",
        email: "arjun.menon@kmrl.com", 
        phone: "+91 9876543212",
        avatar: "",
        isHead: false
      },
      {
        id: "emp4",
        name: "Deepika Sharma",
        role: "Quality Engineer",
        email: "deepika.sharma@kmrl.com",
        phone: "+91 9876543213", 
        avatar: "",
        isHead: false
      }
    ]
  },
  {
    id: "dept2",
    name: "Safety Department",
    description: "Ensures compliance with safety standards and protocols across all operations",
    head: "Suresh Pillai",
    location: "Safety Building - Floor 2",
    memberCount: 28,
    members: [
      {
        id: "emp5",
        name: "Suresh Pillai",
        role: "Safety Director",
        email: "suresh.pillai@kmrl.com",
        phone: "+91 9876543214",
        avatar: "",
        isHead: true
      },
      {
        id: "emp6",
        name: "Kavitha Radhakrishnan",
        role: "Safety Inspector",
        email: "kavitha.r@kmrl.com",
        phone: "+91 9876543215",
        avatar: "",
        isHead: false
      },
      {
        id: "emp7",
        name: "Ravi Chandran",
        role: "Safety Coordinator",
        email: "ravi.chandran@kmrl.com",
        phone: "+91 9876543216",
        avatar: "",
        isHead: false
      }
    ]
  },
  {
    id: "dept3",
    name: "Finance Department", 
    description: "Manages budgets, financial planning, and resource allocation",
    head: "Lakshmi Nambiar",
    location: "Admin Building - Floor 4",
    memberCount: 22,
    members: [
      {
        id: "emp8",
        name: "Lakshmi Nambiar",
        role: "Finance Director",
        email: "lakshmi.nambiar@kmrl.com",
        phone: "+91 9876543217",
        avatar: "",
        isHead: true
      },
      {
        id: "emp9",
        name: "Vinod Thomas",
        role: "Senior Accountant",
        email: "vinod.thomas@kmrl.com",
        phone: "+91 9876543218",
        avatar: "",
        isHead: false
      },
      {
        id: "emp10",
        name: "Anjali Krishnan",
        role: "Budget Analyst",
        email: "anjali.krishnan@kmrl.com",
        phone: "+91 9876543219",
        avatar: "",
        isHead: false
      }
    ]
  },
  {
    id: "dept4",
    name: "HR Department",
    description: "Human resources, employee relations, and organizational development",
    head: "Meera Shenoy",
    location: "Admin Building - Floor 2",
    memberCount: 18,
    members: [
      {
        id: "emp11",
        name: "Meera Shenoy",
        role: "HR Director",
        email: "meera.shenoy@kmrl.com",
        phone: "+91 9876543220",
        avatar: "",
        isHead: true
      },
      {
        id: "emp12",
        name: "Arun Kumar",
        role: "HR Manager",
        email: "arun.kumar@kmrl.com",
        phone: "+91 9876543221",
        avatar: "",
        isHead: false
      }
    ]
  },
  {
    id: "dept5",
    name: "IT Department",
    description: "Information technology infrastructure and digital solutions",
    head: "Kiran Raj",
    location: "Tech Center - Floor 1",
    memberCount: 35,
    members: [
      {
        id: "emp13",
        name: "Kiran Raj",
        role: "IT Director", 
        email: "kiran.raj@kmrl.com",
        phone: "+91 9876543222",
        avatar: "",
        isHead: true
      },
      {
        id: "emp14",
        name: "Rohit Varma",
        role: "System Administrator",
        email: "rohit.varma@kmrl.com",
        phone: "+91 9876543223",
        avatar: "",
        isHead: false
      },
      {
        id: "emp15",
        name: "Sita Devi",
        role: "Software Developer",
        email: "sita.devi@kmrl.com",
        phone: "+91 9876543224",
        avatar: "",
        isHead: false
      }
    ]
  },
  {
    id: "dept6",
    name: "Operations Department",
    description: "Daily metro operations, scheduling, and passenger services",
    head: "Mohan Das",
    location: "Operations Center - Floor 1",
    memberCount: 120,
    members: [
      {
        id: "emp16",
        name: "Mohan Das",
        role: "Operations Director",
        email: "mohan.das@kmrl.com", 
        phone: "+91 9876543225",
        avatar: "",
        isHead: true
      },
      {
        id: "emp17",
        name: "Geetha Nair",
        role: "Operations Manager",
        email: "geetha.nair@kmrl.com",
        phone: "+91 9876543226",
        avatar: "",
        isHead: false
      },
      {
        id: "emp18",
        name: "Shankar Menon",
        role: "Station Master",
        email: "shankar.menon@kmrl.com",
        phone: "+91 9876543227",
        avatar: "",
        isHead: false
      }
    ]
  }
];

export const DepartmentsSection = ({}: DepartmentsSectionProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState<typeof departments[0] | null>(null);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const DepartmentCard = ({ department }: { department: typeof departments[0] }) => (
    <Card className="cursor-pointer hover:shadow-md transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-2">{department.name}</CardTitle>
            <p className="text-sm text-muted-foreground mb-3">{department.description}</p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Head: {department.head}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{department.location}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{department.memberCount} members</span>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {department.memberCount}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="default" 
              className="w-full"
              onClick={() => setSelectedDepartment(department)}
            >
              <Building className="h-4 w-4 mr-2" />
              View Department
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Building className="h-5 w-5 mr-2" />
                {department.name}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Department Info */}
              <div className="space-y-4">
                <p className="text-muted-foreground">{department.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Department Head: {department.head}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{department.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{department.memberCount} total members</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Department Members */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Department Members</h3>
                <div className="space-y-4">
                  {department.members.map((member) => (
                    <Card key={member.id} className={member.isHead ? "border-primary bg-primary/5" : ""}>
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium">{member.name}</h4>
                              {member.isHead && (
                                <Badge variant="default" className="text-xs">
                                  Department Head
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center space-x-2">
                                <Mail className="h-3 w-3 text-muted-foreground" />
                                <span>{member.email}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Phone className="h-3 w-3 text-muted-foreground" />
                                <span>{member.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {department.members.length < department.memberCount && (
                  <Card className="mt-4 border-dashed">
                    <CardContent className="p-4 text-center">
                      <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        +{department.memberCount - department.members.length} more members
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Contact HR for complete member list
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Departments</h2>
          <p className="text-muted-foreground">View departments and team members</p>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <DepartmentCard key={department.id} department={department} />
        ))}
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Organization Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">
                {departments.length}
              </div>
              <div className="text-sm text-muted-foreground">Departments</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {departments.reduce((sum, dept) => sum + dept.memberCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Employees</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {Math.round(departments.reduce((sum, dept) => sum + dept.memberCount, 0) / departments.length)}
              </div>
              <div className="text-sm text-muted-foreground">Avg per Dept</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {departments.find(d => d.memberCount === Math.max(...departments.map(dept => dept.memberCount)))?.memberCount}
              </div>
              <div className="text-sm text-muted-foreground">Largest Dept</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};