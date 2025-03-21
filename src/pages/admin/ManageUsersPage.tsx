
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, 
  UserPlus, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  UserCheck, 
  UserX
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

// Mock data
const students = [
  { id: 1, name: "Emma Johnson", email: "emma.j@example.com", status: "Active", type: "Student", joined: "12 May 2023" },
  { id: 2, name: "Liam Wilson", email: "l.wilson@example.com", status: "Active", type: "Student", joined: "23 Jun 2023" },
  { id: 3, name: "Olivia Smith", email: "o.smith@example.com", status: "Inactive", type: "Student", joined: "05 Apr 2023" },
  { id: 4, name: "Noah Brown", email: "noah.b@example.com", status: "Active", type: "Student", joined: "17 Jul 2023" },
  { id: 5, name: "Ava Davis", email: "ava.d@example.com", status: "Suspended", type: "Student", joined: "30 Jan 2023" },
];

const hrUsers = [
  { id: 1, name: "Sophia Martinez", email: "s.martinez@techcorp.com", status: "Active", type: "HR", company: "TechCorp", joined: "10 Feb 2023" },
  { id: 2, name: "Jackson Lee", email: "j.lee@innovatech.com", status: "Active", type: "HR", company: "InnovaTech", joined: "15 Mar 2023" },
  { id: 3, name: "Isabella Garcia", email: "i.garcia@globalfirm.com", status: "Inactive", type: "HR", company: "GlobalFirm", joined: "22 May 2023" },
  { id: 4, name: "Lucas Taylor", email: "l.taylor@nexusind.com", status: "Active", type: "HR", company: "Nexus Industries", joined: "08 Apr 2023" },
];

const ManageUsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("students");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ id: number, name: string } | null>(null);
  const { toast } = useToast();

  const handleDeleteUser = () => {
    if (userToDelete) {
      // In a real app, this would call an API to delete the user
      toast({
        title: "User deleted",
        description: `${userToDelete.name} has been removed from the system.`,
      });
      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const confirmDelete = (id: number, name: string) => {
    setUserToDelete({ id, name });
    setIsDeleteDialogOpen(true);
  };

  const changeUserStatus = (id: number, name: string, newStatus: string) => {
    // In a real app, this would call an API to update the user status
    toast({
      title: "Status updated",
      description: `${name}'s status has been changed to ${newStatus}.`,
    });
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHRUsers = hrUsers.filter(
    (hr) =>
      hr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hr.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hr.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Users</h1>
          <p className="text-lg text-white/60 mt-2">
            View and manage all users in the system
          </p>
        </div>

        <Card className="glass-effect">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-white">User Management</CardTitle>
              <Button className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]">
                <UserPlus className="mr-2 h-4 w-4" />
                Add New User
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  placeholder="Search users..."
                  className="pl-10 bg-white/5 border-white/10 text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>

            <Tabs defaultValue="students" onValueChange={setSelectedTab}>
              <TabsList className="bg-white/10 text-white/70">
                <TabsTrigger 
                  value="students"
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white"
                >
                  Students
                </TabsTrigger>
                <TabsTrigger 
                  value="hr"
                  className="data-[state=active]:bg-white/20 data-[state=active]:text-white"
                >
                  HR Managers
                </TabsTrigger>
              </TabsList>
              <TabsContent value="students" className="mt-4">
                <Card className="bg-transparent border-white/10">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-white/5">
                        <TableRow className="hover:bg-white/10 border-white/10">
                          <TableHead className="text-white">Name</TableHead>
                          <TableHead className="text-white">Email</TableHead>
                          <TableHead className="text-white">Joined</TableHead>
                          <TableHead className="text-white">Status</TableHead>
                          <TableHead className="text-white text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStudents.length > 0 ? (
                          filteredStudents.map((student) => (
                            <TableRow key={student.id} className="hover:bg-white/10 border-white/10">
                              <TableCell className="font-medium text-white">
                                {student.name}
                              </TableCell>
                              <TableCell className="text-white/70">{student.email}</TableCell>
                              <TableCell className="text-white/70">{student.joined}</TableCell>
                              <TableCell>
                                <span 
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    student.status === "Active" 
                                      ? "bg-green-500/20 text-green-400" 
                                      : student.status === "Inactive" 
                                        ? "bg-orange-500/20 text-orange-400" 
                                        : "bg-red-500/20 text-red-400"
                                  }`}
                                >
                                  {student.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur border-white/10">
                                    <DropdownMenuItem 
                                      className="text-white hover:bg-white/10 cursor-pointer flex items-center"
                                      onClick={() => toast({ title: "Edit user", description: "Editing user profile" })}
                                    >
                                      <Edit className="mr-2 h-4 w-4" />
                                      <span>Edit</span>
                                    </DropdownMenuItem>
                                    
                                    <DropdownMenuItem 
                                      className="text-white hover:bg-white/10 cursor-pointer flex items-center"
                                      onClick={() => changeUserStatus(student.id, student.name, student.status === "Active" ? "Inactive" : "Active")}
                                    >
                                      {student.status === "Active" ? (
                                        <>
                                          <UserX className="mr-2 h-4 w-4" />
                                          <span>Deactivate</span>
                                        </>
                                      ) : (
                                        <>
                                          <UserCheck className="mr-2 h-4 w-4" />
                                          <span>Activate</span>
                                        </>
                                      )}
                                    </DropdownMenuItem>
                                    
                                    <DropdownMenuItem 
                                      className="text-red-500 hover:bg-red-950/30 cursor-pointer flex items-center"
                                      onClick={() => confirmDelete(student.id, student.name)}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      <span>Delete</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow className="hover:bg-white/10 border-white/10">
                            <TableCell colSpan={5} className="text-center text-white/60">
                              No students found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="hr" className="mt-4">
                <Card className="bg-transparent border-white/10">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-white/5">
                        <TableRow className="hover:bg-white/10 border-white/10">
                          <TableHead className="text-white">Name</TableHead>
                          <TableHead className="text-white">Email</TableHead>
                          <TableHead className="text-white">Company</TableHead>
                          <TableHead className="text-white">Status</TableHead>
                          <TableHead className="text-white text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredHRUsers.length > 0 ? (
                          filteredHRUsers.map((hr) => (
                            <TableRow key={hr.id} className="hover:bg-white/10 border-white/10">
                              <TableCell className="font-medium text-white">
                                {hr.name}
                              </TableCell>
                              <TableCell className="text-white/70">{hr.email}</TableCell>
                              <TableCell className="text-white/70">{hr.company}</TableCell>
                              <TableCell>
                                <span 
                                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    hr.status === "Active" 
                                      ? "bg-green-500/20 text-green-400" 
                                      : hr.status === "Inactive" 
                                        ? "bg-orange-500/20 text-orange-400" 
                                        : "bg-red-500/20 text-red-400"
                                  }`}
                                >
                                  {hr.status}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10">
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur border-white/10">
                                    <DropdownMenuItem 
                                      className="text-white hover:bg-white/10 cursor-pointer flex items-center"
                                      onClick={() => toast({ title: "Edit user", description: "Editing HR manager profile" })}
                                    >
                                      <Edit className="mr-2 h-4 w-4" />
                                      <span>Edit</span>
                                    </DropdownMenuItem>
                                    
                                    <DropdownMenuItem 
                                      className="text-white hover:bg-white/10 cursor-pointer flex items-center"
                                      onClick={() => changeUserStatus(hr.id, hr.name, hr.status === "Active" ? "Inactive" : "Active")}
                                    >
                                      {hr.status === "Active" ? (
                                        <>
                                          <UserX className="mr-2 h-4 w-4" />
                                          <span>Deactivate</span>
                                        </>
                                      ) : (
                                        <>
                                          <UserCheck className="mr-2 h-4 w-4" />
                                          <span>Activate</span>
                                        </>
                                      )}
                                    </DropdownMenuItem>
                                    
                                    <DropdownMenuItem 
                                      className="text-red-500 hover:bg-red-950/30 cursor-pointer flex items-center"
                                      onClick={() => confirmDelete(hr.id, hr.name)}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      <span>Delete</span>
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow className="hover:bg-white/10 border-white/10">
                            <TableCell colSpan={5} className="text-center text-white/60">
                              No HR managers found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-background/95 backdrop-blur border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="text-white/70 py-4">
            Are you sure you want to delete the user "{userToDelete?.name}"? This action cannot be undone.
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-white/10 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteUser}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ManageUsersPage;
