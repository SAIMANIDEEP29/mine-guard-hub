import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Mail, Lock, Eye, EyeOff, User, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-mining.jpg";

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signUp, user, loading } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [mines, setMines] = useState<any[]>([]);
  
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    department: "",
    position: "",
    mineId: "",
    role: "worker" as const
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (user && !loading) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  // Fetch available mines for signup
  useEffect(() => {
    const fetchMines = async () => {
      const { data, error } = await supabase
        .from('mines')
        .select('id, name, location')
        .eq('status', 'active');
      
      if (error) {
        console.error('Error fetching mines:', error);
        toast({
          title: "Error",
          description: "Failed to load mines. Please refresh the page.",
          variant: "destructive",
        });
      } else if (data) {
        console.log('Loaded mines:', data);
        setMines(data);
      }
    };
    
    fetchMines();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await signIn(loginData.email, loginData.password);
      
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "Successfully logged in to your account.",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First create the user account
      const { error: signUpError } = await signUp(
        signupData.email, 
        signupData.password,
        {
          first_name: signupData.firstName,
          last_name: signupData.lastName,
          phone: signupData.phone,
          department: signupData.department,
          position: signupData.position
        }
      );
      
      if (signUpError) {
        toast({
          title: "Signup Failed",
          description: signUpError.message,
          variant: "destructive",
        });
        return;
      }

      // Get the newly created user
      const { data: { user: newUser } } = await supabase.auth.getUser();
      
      if (newUser) {
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: newUser.id,
            mine_id: signupData.mineId,
            first_name: signupData.firstName,
            last_name: signupData.lastName,
            email: signupData.email,
            phone: signupData.phone,
            department: signupData.department,
            position: signupData.position
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }

        // Create user role
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: newUser.id,
            role: signupData.role,
            mine_id: signupData.mineId
          });

        if (roleError) {
          console.error('Role creation error:', roleError);
        }
      }

      toast({
        title: "Account Created!",
        description: "Please check your email to verify your account.",
      });
      
      setActiveTab("login");
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-primary animate-pulse" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src={heroImage}
          alt="Mining operation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white p-8">
            <Shield className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Rockfall Prediction & Alert System</h1>
            <p className="text-xl opacity-90">
              Advanced monitoring and safety management for mining operations
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-bold">Welcome</h2>
            <p className="text-muted-foreground mt-2">
              Access your mining safety dashboard
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Login</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          value={loginData.email}
                          onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={loginData.password}
                          onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                          className="pl-10 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-2 h-6 w-6 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Register for a new mining safety account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="firstName"
                            placeholder="John"
                            value={signupData.firstName}
                            onChange={(e) => setSignupData(prev => ({ ...prev, firstName: e.target.value }))}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Smith"
                          value={signupData.lastName}
                          onChange={(e) => setSignupData(prev => ({ ...prev, lastName: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signupEmail"
                          type="email"
                          placeholder="john@company.com"
                          value={signupData.email}
                          onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signupPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={signupData.password}
                          onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                          className="pl-10 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-2 h-6 w-6 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mine">Mine</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                        <Select value={signupData.mineId} onValueChange={(value) => setSignupData(prev => ({ ...prev, mineId: value }))}>
                          <SelectTrigger className="pl-10">
                            <SelectValue placeholder="Select your mine" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border border-border shadow-lg z-50 max-h-60 overflow-auto">
                            {mines.map((mine) => (
                              <SelectItem key={mine.id} value={mine.id} className="cursor-pointer hover:bg-accent">
                                {mine.name} - {mine.location}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          placeholder="Safety"
                          value={signupData.department}
                          onChange={(e) => setSignupData(prev => ({ ...prev, department: e.target.value }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <Input
                          id="position"
                          placeholder="Engineer"
                          value={signupData.position}
                          onChange={(e) => setSignupData(prev => ({ ...prev, position: e.target.value }))}
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading || !signupData.mineId}>
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}