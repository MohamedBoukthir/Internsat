
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Shield, Bell, Globe, Lock, Mail, Database, Key } from "lucide-react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const SettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    newUsers: true,
    newInternships: true,
    reportedIssues: true,
    systemUpdates: false
  });
  
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    allowRegistration: true,
    autoApproveInternships: false,
    requireEmailVerification: true
  });
  
  const { toast } = useToast();
  const generalForm = useForm();
  const notificationsForm = useForm();

  const handleSaveEmailSettings = () => {
    // In a real app, this would call an API to update settings
    toast({
      title: "Settings saved",
      description: "Email notification settings have been updated.",
    });
  };

  const handleSaveSystemSettings = () => {
    // In a real app, this would call an API to update settings
    toast({
      title: "Settings saved",
      description: "System settings have been updated.",
    });
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-lg text-white/60 mt-2">
            Configure system settings and preferences
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="bg-white/10 text-white/70">
            <TabsTrigger 
              value="general"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              General
            </TabsTrigger>
            <TabsTrigger 
              value="notifications"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="security"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              Security
            </TabsTrigger>
            <TabsTrigger 
              value="api"
              className="data-[state=active]:bg-white/20 data-[state=active]:text-white"
            >
              API Keys
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white">General Settings</CardTitle>
                <CardDescription>
                  Manage basic system configuration and behavior
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...generalForm}>
                  <div className="space-y-4">
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base text-white">
                          Maintenance Mode
                        </FormLabel>
                        <FormDescription>
                          When enabled, only administrators can access the system.
                        </FormDescription>
                      </div>
                      <Switch
                        checked={systemSettings.maintenanceMode}
                        onCheckedChange={(checked) => 
                          setSystemSettings({...systemSettings, maintenanceMode: checked})
                        }
                      />
                    </FormItem>

                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base text-white">
                          User Registration
                        </FormLabel>
                        <FormDescription>
                          Allow new users to register on the platform.
                        </FormDescription>
                      </div>
                      <Switch
                        checked={systemSettings.allowRegistration}
                        onCheckedChange={(checked) => 
                          setSystemSettings({...systemSettings, allowRegistration: checked})
                        }
                      />
                    </FormItem>

                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base text-white">
                          Auto-approve Internships
                        </FormLabel>
                        <FormDescription>
                          Automatically approve new internship postings without review.
                        </FormDescription>
                      </div>
                      <Switch
                        checked={systemSettings.autoApproveInternships}
                        onCheckedChange={(checked) => 
                          setSystemSettings({...systemSettings, autoApproveInternships: checked})
                        }
                      />
                    </FormItem>

                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base text-white">
                          Email Verification
                        </FormLabel>
                        <FormDescription>
                          Require users to verify their email address upon registration.
                        </FormDescription>
                      </div>
                      <Switch
                        checked={systemSettings.requireEmailVerification}
                        onCheckedChange={(checked) => 
                          setSystemSettings({...systemSettings, requireEmailVerification: checked})
                        }
                      />
                    </FormItem>

                    <div className="pt-4">
                      <Button 
                        onClick={handleSaveSystemSettings}
                        className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white">
                  <div className="flex items-center">
                    <Bell className="mr-2 h-5 w-5" />
                    Notification Settings
                  </div>
                </CardTitle>
                <CardDescription>
                  Configure which email notifications you receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...notificationsForm}>
                  <div className="space-y-4">
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base text-white">
                          New User Registrations
                        </FormLabel>
                        <FormDescription>
                          Receive notifications when new users register
                        </FormDescription>
                      </div>
                      <Switch
                        checked={emailNotifications.newUsers}
                        onCheckedChange={(checked) => 
                          setEmailNotifications({...emailNotifications, newUsers: checked})
                        }
                      />
                    </FormItem>

                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base text-white">
                          New Internship Postings
                        </FormLabel>
                        <FormDescription>
                          Receive notifications when new internships are posted
                        </FormDescription>
                      </div>
                      <Switch
                        checked={emailNotifications.newInternships}
                        onCheckedChange={(checked) => 
                          setEmailNotifications({...emailNotifications, newInternships: checked})
                        }
                      />
                    </FormItem>

                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base text-white">
                          Reported Issues
                        </FormLabel>
                        <FormDescription>
                          Receive notifications when users report issues
                        </FormDescription>
                      </div>
                      <Switch
                        checked={emailNotifications.reportedIssues}
                        onCheckedChange={(checked) => 
                          setEmailNotifications({...emailNotifications, reportedIssues: checked})
                        }
                      />
                    </FormItem>

                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-white/10 p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base text-white">
                          System Updates
                        </FormLabel>
                        <FormDescription>
                          Receive notifications about system updates and maintenance
                        </FormDescription>
                      </div>
                      <Switch
                        checked={emailNotifications.systemUpdates}
                        onCheckedChange={(checked) => 
                          setEmailNotifications({...emailNotifications, systemUpdates: checked})
                        }
                      />
                    </FormItem>

                    <div className="pt-4">
                      <Button 
                        onClick={handleSaveEmailSettings}
                        className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]"
                      >
                        Save Notification Settings
                      </Button>
                    </div>
                  </div>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white">
                  <div className="flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Security Settings
                  </div>
                </CardTitle>
                <CardDescription>
                  Manage passwords and security configurations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Password Policy</h3>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <FormLabel>Minimum Password Length</FormLabel>
                          <Input 
                            type="number" 
                            defaultValue="8" 
                            className="bg-white/5 border-white/10 text-white"
                          />
                        </div>
                        <div>
                          <FormLabel>Password Expiry (Days)</FormLabel>
                          <Input 
                            type="number" 
                            defaultValue="90" 
                            className="bg-white/5 border-white/10 text-white"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="require-uppercase" />
                        <label htmlFor="require-uppercase" className="text-white">
                          Require uppercase letters
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="require-numbers" defaultChecked />
                        <label htmlFor="require-numbers" className="text-white">
                          Require numbers
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="require-symbols" />
                        <label htmlFor="require-symbols" className="text-white">
                          Require special characters
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <h3 className="text-lg font-medium text-white">Two-Factor Authentication</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="require-2fa-admins" defaultChecked />
                        <label htmlFor="require-2fa-admins" className="text-white">
                          Require 2FA for administrators
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="require-2fa-hr" />
                        <label htmlFor="require-2fa-hr" className="text-white">
                          Require 2FA for HR managers
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button 
                      onClick={() => toast({
                        title: "Security settings saved",
                        description: "Security configurations have been updated.",
                      })}
                      className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]"
                    >
                      Save Security Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Keys Settings */}
          <TabsContent value="api">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="text-white">
                  <div className="flex items-center">
                    <Key className="mr-2 h-5 w-5" />
                    API Integration
                  </div>
                </CardTitle>
                <CardDescription>
                  Manage API keys and external service integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">Email Provider</h3>
                    <div className="space-y-4">
                      <div>
                        <FormLabel>API Key</FormLabel>
                        <Input 
                          type="password" 
                          value="••••••••••••••••••••••" 
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
                          Update Key
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <h3 className="text-lg font-medium text-white">Storage Provider</h3>
                    <div className="space-y-4">
                      <div>
                        <FormLabel>API Key</FormLabel>
                        <Input 
                          type="password" 
                          value="••••••••••••••••••••••" 
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" className="border-white/10 text-white hover:bg-white/10">
                          Update Key
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <h3 className="text-lg font-medium text-white">Webhook Configuration</h3>
                    <div className="space-y-4">
                      <div>
                        <FormLabel>Webhook URL</FormLabel>
                        <Input 
                          type="text" 
                          placeholder="https://your-service.com/webhook" 
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <FormLabel>Secret Key</FormLabel>
                        <Input 
                          type="password" 
                          placeholder="Enter webhook secret key" 
                          className="bg-white/5 border-white/10 text-white"
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button 
                          onClick={() => toast({
                            title: "Webhook settings saved",
                            description: "Webhook configurations have been updated.",
                          })}
                          className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]"
                        >
                          Save Webhook
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
