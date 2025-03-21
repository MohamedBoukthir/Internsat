
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle,
  XCircle 
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
const internships = [
  { 
    id: 1, 
    title: "Frontend Developer Intern", 
    company: "TechCorp", 
    location: "New York, NY", 
    status: "Active", 
    posted: "15 Jul 2023",
    applications: 12 
  },
  { 
    id: 2, 
    title: "Marketing Intern", 
    company: "GlobalFirm", 
    location: "Chicago, IL", 
    status: "Under Review", 
    posted: "10 Aug 2023",
    applications: 8 
  },
  { 
    id: 3, 
    title: "Data Science Intern", 
    company: "InnovaTech", 
    location: "Remote", 
    status: "Active", 
    posted: "22 Aug 2023",
    applications: 15 
  },
  { 
    id: 4, 
    title: "UX Design Intern", 
    company: "DesignHub", 
    location: "San Francisco, CA", 
    status: "Inactive", 
    posted: "05 Sep 2023",
    applications: 6 
  },
  { 
    id: 5, 
    title: "Backend Engineer Intern", 
    company: "Nexus Industries", 
    location: "Boston, MA", 
    status: "Active", 
    posted: "18 Sep 2023",
    applications: 10 
  },
];

const ManageInternshipsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [internshipToDelete, setInternshipToDelete] = useState<{ id: number, title: string } | null>(null);
  const { toast } = useToast();

  const handleDeleteInternship = () => {
    if (internshipToDelete) {
      // In a real app, this would call an API to delete the internship
      toast({
        title: "Internship deleted",
        description: `"${internshipToDelete.title}" has been removed from the system.`,
      });
      setIsDeleteDialogOpen(false);
      setInternshipToDelete(null);
    }
  };

  const confirmDelete = (id: number, title: string) => {
    setInternshipToDelete({ id, title });
    setIsDeleteDialogOpen(true);
  };

  const changeInternshipStatus = (id: number, title: string, newStatus: string) => {
    // In a real app, this would call an API to update the internship status
    toast({
      title: "Status updated",
      description: `"${title}" status has been changed to ${newStatus}.`,
    });
  };

  const filteredInternships = internships.filter(
    (internship) =>
      internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Internships</h1>
          <p className="text-lg text-white/60 mt-2">
            Monitor and manage all internship listings
          </p>
        </div>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-white">Internship Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  placeholder="Search internships..."
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

            <Card className="bg-transparent border-white/10">
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-white/5">
                    <TableRow className="hover:bg-white/10 border-white/10">
                      <TableHead className="text-white">Title</TableHead>
                      <TableHead className="text-white">Company</TableHead>
                      <TableHead className="text-white">Location</TableHead>
                      <TableHead className="text-white">Posted</TableHead>
                      <TableHead className="text-white">Applications</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                      <TableHead className="text-white text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInternships.length > 0 ? (
                      filteredInternships.map((internship) => (
                        <TableRow key={internship.id} className="hover:bg-white/10 border-white/10">
                          <TableCell className="font-medium text-white">
                            {internship.title}
                          </TableCell>
                          <TableCell className="text-white/70">{internship.company}</TableCell>
                          <TableCell className="text-white/70">{internship.location}</TableCell>
                          <TableCell className="text-white/70">{internship.posted}</TableCell>
                          <TableCell className="text-white/70">{internship.applications}</TableCell>
                          <TableCell>
                            <span 
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                internship.status === "Active" 
                                  ? "bg-green-500/20 text-green-400" 
                                  : internship.status === "Under Review" 
                                    ? "bg-blue-500/20 text-blue-400" 
                                    : "bg-orange-500/20 text-orange-400"
                              }`}
                            >
                              {internship.status}
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
                                  onClick={() => toast({ title: "View details", description: "Viewing internship details" })}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>View Details</span>
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem 
                                  className="text-white hover:bg-white/10 cursor-pointer flex items-center"
                                  onClick={() => toast({ title: "Edit internship", description: "Editing internship details" })}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Edit</span>
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem 
                                  className="text-white hover:bg-white/10 cursor-pointer flex items-center"
                                  onClick={() => 
                                    changeInternshipStatus(
                                      internship.id, 
                                      internship.title, 
                                      internship.status === "Active" ? "Inactive" : "Active"
                                    )
                                  }
                                >
                                  {internship.status === "Active" ? (
                                    <>
                                      <XCircle className="mr-2 h-4 w-4" />
                                      <span>Deactivate</span>
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      <span>Activate</span>
                                    </>
                                  )}
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem 
                                  className="text-red-500 hover:bg-red-950/30 cursor-pointer flex items-center"
                                  onClick={() => confirmDelete(internship.id, internship.title)}
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
                        <TableCell colSpan={7} className="text-center text-white/60">
                          No internships found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
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
            Are you sure you want to delete the internship "{internshipToDelete?.title}"? This action cannot be undone.
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
              onClick={handleDeleteInternship}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ManageInternshipsPage;
