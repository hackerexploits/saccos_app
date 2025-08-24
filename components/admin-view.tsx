"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Users, Shield, Database, Bell, Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export function AdminView() {
  const [activeTab, setActiveTab] = useState("system")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin & Settings</h1>
          <p className="text-gray-600 mt-1">System configuration and administrative controls</p>
        </div>
        <Badge variant="outline" className="text-green-600">
          <CheckCircle className="h-3 w-3 mr-1" />
          System Healthy
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Status</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Online</div>
                <p className="text-xs text-muted-foreground">99.9% uptime</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Database</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">Healthy</div>
                <p className="text-xs text-muted-foreground">2.4GB used</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
                <p className="text-xs text-muted-foreground">Current users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Backup</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2h ago</div>
                <p className="text-xs text-muted-foreground">Successful</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
                <CardDescription>Core system settings and parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization Name</Label>
                  <Input id="org-name" defaultValue="Community Savings Cooperative" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                      <SelectItem value="gbp">GBP (£)</SelectItem>
                      <SelectItem value="kes">KES (KSh)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                      <SelectItem value="eat">East Africa Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="maintenance" />
                  <Label htmlFor="maintenance">Maintenance Mode</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Recent system notifications and warnings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Backup Completed</p>
                    <p className="text-xs text-gray-600">Daily backup completed successfully at 2:00 AM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">High Database Usage</p>
                    <p className="text-xs text-gray-600">Database usage at 85% - consider optimization</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">System Update Available</p>
                    <p className="text-xs text-gray-600">Version 2.1.4 is available for installation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage system users and their permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">System Administrators</h4>
                  <Button size="sm">Add Admin</Button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "John Smith", email: "john@coop.com", role: "Super Admin", status: "Active" },
                    { name: "Sarah Johnson", email: "sarah@coop.com", role: "Admin", status: "Active" },
                    { name: "Michael Chen", email: "michael@coop.com", role: "Manager", status: "Active" },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{user.role}</Badge>
                        <Badge variant="secondary" className="text-green-600">
                          {user.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
                <CardDescription>Configure permissions for different user roles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Member Management</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Loan Approval</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Financial Reports</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>System Settings</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>User Management</span>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Session Management</CardTitle>
                <CardDescription>Active user sessions and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input id="session-timeout" type="number" defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-sessions">Max Concurrent Sessions</Label>
                  <Input id="max-sessions" type="number" defaultValue="3" />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="force-logout" defaultChecked />
                  <Label htmlFor="force-logout">Force logout on password change</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="track-activity" defaultChecked />
                  <Label htmlFor="track-activity">Track user activity</Label>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure system security and authentication policies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Password Policy</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="min-length">Minimum Length</Label>
                      <Input id="min-length" type="number" defaultValue="8" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="require-uppercase" defaultChecked />
                      <Label htmlFor="require-uppercase">Require uppercase letters</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="require-numbers" defaultChecked />
                      <Label htmlFor="require-numbers">Require numbers</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="require-symbols" defaultChecked />
                      <Label htmlFor="require-symbols">Require special characters</Label>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                      <Input id="password-expiry" type="number" defaultValue="90" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Multi-Factor Authentication</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch id="mfa-required" defaultChecked />
                      <Label htmlFor="mfa-required">Require MFA for all users</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sms-mfa" defaultChecked />
                      <Label htmlFor="sms-mfa">SMS Authentication</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="email-mfa" defaultChecked />
                      <Label htmlFor="email-mfa">Email Authentication</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="app-mfa" />
                      <Label htmlFor="app-mfa">Authenticator App</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Monitoring</CardTitle>
              <CardDescription>Recent security events and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    event: "Failed login attempt",
                    user: "unknown@example.com",
                    time: "2 minutes ago",
                    severity: "medium",
                  },
                  {
                    event: "Password changed",
                    user: "sarah@coop.com",
                    time: "1 hour ago",
                    severity: "low",
                  },
                  {
                    event: "New admin user created",
                    user: "john@coop.com",
                    time: "3 hours ago",
                    severity: "high",
                  },
                  {
                    event: "Successful login",
                    user: "michael@coop.com",
                    time: "5 hours ago",
                    severity: "low",
                  },
                ].map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield
                        className={`h-4 w-4 ${
                          event.severity === "high"
                            ? "text-red-600"
                            : event.severity === "medium"
                              ? "text-yellow-600"
                              : "text-green-600"
                        }`}
                      />
                      <div>
                        <p className="font-medium">{event.event}</p>
                        <p className="text-sm text-gray-600">{event.user}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{event.time}</p>
                      <Badge
                        variant={
                          event.severity === "high"
                            ? "destructive"
                            : event.severity === "medium"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {event.severity}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Products Configuration</CardTitle>
              <CardDescription>Manage savings and loan products</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="savings" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="savings">Savings Products</TabsTrigger>
                  <TabsTrigger value="loans">Loan Products</TabsTrigger>
                </TabsList>

                <TabsContent value="savings" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Active Savings Products</h4>
                    <Button size="sm">Add Product</Button>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        name: "Regular Savings",
                        rate: "2.5%",
                        minBalance: "$10",
                        status: "Active",
                      },
                      {
                        name: "Fixed Deposit",
                        rate: "4.2%",
                        minBalance: "$1,000",
                        status: "Active",
                      },
                      {
                        name: "Target Savings",
                        rate: "3.0%",
                        minBalance: "$50",
                        status: "Active",
                      },
                    ].map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">Min Balance: {product.minBalance}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{product.rate}</Badge>
                          <Badge variant="secondary" className="text-green-600">
                            {product.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="loans" className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Active Loan Products</h4>
                    <Button size="sm">Add Product</Button>
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        name: "Personal Loan",
                        rate: "12%",
                        maxAmount: "$10,000",
                        term: "24 months",
                        status: "Active",
                      },
                      {
                        name: "Business Loan",
                        rate: "10%",
                        maxAmount: "$50,000",
                        term: "36 months",
                        status: "Active",
                      },
                      {
                        name: "Emergency Loan",
                        rate: "8%",
                        maxAmount: "$5,000",
                        term: "12 months",
                        status: "Active",
                      },
                    ].map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">
                            Max: {product.maxAmount} • Term: {product.term}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{product.rate}</Badge>
                          <Badge variant="secondary" className="text-green-600">
                            {product.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Email Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch id="email-deposits" defaultChecked />
                      <Label htmlFor="email-deposits">Deposit confirmations</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="email-withdrawals" defaultChecked />
                      <Label htmlFor="email-withdrawals">Withdrawal notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="email-loans" defaultChecked />
                      <Label htmlFor="email-loans">Loan status updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="email-overdue" defaultChecked />
                      <Label htmlFor="email-overdue">Overdue payment alerts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="email-statements" defaultChecked />
                      <Label htmlFor="email-statements">Monthly statements</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">SMS Notifications</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Switch id="sms-deposits" defaultChecked />
                      <Label htmlFor="sms-deposits">Deposit confirmations</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sms-withdrawals" defaultChecked />
                      <Label htmlFor="sms-withdrawals">Withdrawal notifications</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sms-loans" />
                      <Label htmlFor="sms-loans">Loan status updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sms-overdue" defaultChecked />
                      <Label htmlFor="sms-overdue">Overdue payment alerts</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sms-security" defaultChecked />
                      <Label htmlFor="sms-security">Security alerts</Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h4 className="font-medium">Email Templates</h4>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="welcome-template">Welcome Email Template</Label>
                    <Textarea
                      id="welcome-template"
                      placeholder="Welcome to our cooperative..."
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="overdue-template">Overdue Payment Template</Label>
                    <Textarea
                      id="overdue-template"
                      placeholder="Your payment is overdue..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Recovery</CardTitle>
              <CardDescription>Manage system backups and data recovery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Backup Schedule</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="backup-frequency">Backup Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backup-time">Backup Time</Label>
                      <Input id="backup-time" type="time" defaultValue="02:00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="retention-days">Retention Period (days)</Label>
                      <Input id="retention-days" type="number" defaultValue="30" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="auto-backup" defaultChecked />
                      <Label htmlFor="auto-backup">Enable automatic backups</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Recent Backups</h4>
                  <div className="space-y-3">
                    {[
                      { date: "2024-01-15", time: "02:00 AM", size: "2.4 GB", status: "Success" },
                      { date: "2024-01-14", time: "02:00 AM", size: "2.3 GB", status: "Success" },
                      { date: "2024-01-13", time: "02:00 AM", size: "2.3 GB", status: "Success" },
                      { date: "2024-01-12", time: "02:00 AM", size: "2.2 GB", status: "Failed" },
                    ].map((backup, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{backup.date}</p>
                          <p className="text-sm text-gray-600">
                            {backup.time} • {backup.size}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={backup.status === "Success" ? "secondary" : "destructive"}
                            className={backup.status === "Success" ? "text-green-600" : ""}
                          >
                            {backup.status}
                          </Badge>
                          {backup.status === "Success" && (
                            <Button variant="outline" size="sm">
                              Restore
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button>Create Backup Now</Button>
                <Button variant="outline">Download Latest Backup</Button>
                <Button variant="outline">Test Recovery</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
