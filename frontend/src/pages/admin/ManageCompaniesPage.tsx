
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
  XCircle,
  Building,
  Users,
  Briefcase 
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
const companies = [
  { 
    id: 1, 
    name: "TechCorp", 
    industry: "Technology", 
    location: "New York, NY", 
    status: "Verified", 
    hrCount: 3,
    internships: 5,
    joined: "10 Jan 2023"
  },
  { 
    id: 2, 
    name: "GlobalFirm", 
    industry: "Finance", 
    location: "Chicago, IL", 
    status: "Pending Verification", 
    hrCount: 2,
    internships: 3,
    joined: "15 Feb 2023"
  },
  { 
    id: 3, 
    name: "InnovaTech", 
    industry: "Software", 
    location: "San Francisco, CA", 
    status: "Verified", 
    hrCount: 4,
    internships: 7,
    joined: "05 Mar 2023"
  },
  { 
    id: 4, 
    name: "DesignHub", 
    industry: "Design", 
    location: "Los Angeles, CA", 
    status: "Suspended", 
    hrCount: 1,
    internships: 2,
    joined: "22 Apr 2023"
  },
  { 
    id: 5, 
    name: "Nexus Industries", 
    industry: "Manufacturing", 
    location: "Boston, MA", 
    status: "Verified", 
    hrCount: 2,
    internships: 4,
    joined: "18 May 2023"
  },
];

const ManageCompaniesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<{ id: number, name: string } | null>(null);
  const { toast } = useToast();

  const handleDeleteCompany = () => {
    if (companyToDelete) {
      // In a real app, this would call an API to delete the company
      toast({
        title: "Company deleted",
        description: `${companyToDelete.name} has been removed from the system.`,
      });
      setIsDeleteDialogOpen(false);
      setCompanyToDelete(null);
    }
  };

  const confirmDelete = (id: number, name: string) => {
    setCompanyToDelete({ id, name });
    setIsDeleteDialogOpen(true);
  };

  const changeCompanyStatus = (id: number, name: string, newStatus: string) => {
    // In a real app, this would call an API to update the company status
    toast({
      title: "Status updated",
      description: `${name}'s status has been changed to ${newStatus}.`,
    });
  };

  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Companies</h1>
          <p className="text-lg text-white/60 mt-2">
            Oversee and manage all registered companies
          </p>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-effect">
            <CardContent className="p-6 flex items-center">
              <div className="bg-white rounded-full p-3 mr-4">
                <Building className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg text-white/60">Total Companies</p>
                <p className="text-3xl font-bold text-white">{companies.length}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect">
            <CardContent className="p-6 flex items-center">
              <div className="bg-white rounded-full p-3 mr-4">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg text-white/60">HR Managers</p>
                <p className="text-3xl font-bold text-white">
                  {companies.reduce((total, company) => total + company.hrCount, 0)}
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect">
            <CardContent className="p-6 flex items-center">
              <div className="bg-white rounded-full p-3 mr-4">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg text-white/60">Active Internships</p>
                <p className="text-3xl font-bold text-white">
                  {companies.reduce((total, company) => total + company.internships, 0)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-white">Company Registry</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                <Input
                  placeholder="Search companies..."
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
                      <TableHead className="text-white">Company Name</TableHead>
                      <TableHead className="text-white">Industry</TableHead>
                      <TableHead className="text-white">Location</TableHead>
                      <TableHead className="text-white">HR Count</TableHead>
                      <TableHead className="text-white">Internships</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                      <TableHead className="text-white text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompanies.length > 0 ? (
                      filteredCompanies.map((company) => (
                        <TableRow key={company.id} className="hover:bg-white/10 border-white/10">
                          <TableCell className="font-medium text-white">
                            {company.name}
                          </TableCell>
                          <TableCell className="text-white/70">{company.industry}</TableCell>
                          <TableCell className="text-white/70">{company.location}</TableCell>
                          <TableCell className="text-white/70">{company.hrCount}</TableCell>
                          <TableCell className="text-white/70">{company.internships}</TableCell>
                          <TableCell>
                            <span 
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                company.status === "Verified" 
                                  ? "bg-green-500/20 text-green-400" 
                                  : company.status === "Pending Verification" 
                                    ? "bg-blue-500/20 text-blue-400" 
                                    : "bg-orange-500/20 text-orange-400"
                              }`}
                            >
                              {company.status}
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
                                  onClick={() => toast({ title: "View company", description: "Viewing company details" })}
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>View Details</span>
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem 
                                  className="text-white hover:bg-white/10 cursor-pointer flex items-center"
                                  onClick={() => toast({ title: "Edit company", description: "Editing company profile" })}
                                >
                                  <Edit className="mr-2 h-4 w-4" />
                                  <span>Edit</span>
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem 
                                  className="text-white hover:bg-white/10 cursor-pointer flex items-center"
                                  onClick={() => 
                                    changeCompanyStatus(
                                      company.id, 
                                      company.name, 
                                      company.status === "Verified" ? "Suspended" : "Verified"
                                    )
                                  }
                                >
                                  {company.status === "Verified" ? (
                                    <>
                                      <XCircle className="mr-2 h-4 w-4" />
                                      <span>Suspend</span>
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      <span>Verify</span>
                                    </>
                                  )}
                                </DropdownMenuItem>
                                
                                <DropdownMenuItem 
                                  className="text-red-500 hover:bg-red-950/30 cursor-pointer flex items-center"
                                  onClick={() => confirmDelete(company.id, company.name)}
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
                          No companies found
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
            Are you sure you want to delete the company "{companyToDelete?.name}"? This will also remove all associated HR accounts and internship listings. This action cannot be undone.
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
              onClick={handleDeleteCompany}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default ManageCompaniesPage;
