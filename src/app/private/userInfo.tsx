'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Delete, Mail, Lock, LogOut } from "lucide-react";
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

interface UserInfo {
  name : string;
  email : string;
  phone : string;
  credits : number,
  plan : string
}


export default function UserProfile({userInfo} : {userInfo : UserInfo}) {
    const supabase = createClient()

    useEffect(() => {
        async function init(){
            const { data } = await supabase.auth.getUser()
            //setUser(data.user)
        }
        init()
    })

    function signOut(){
      supabase.auth.signOut()
      console.log("click")
      redirect('/')
    }
    
  return (
    <Card className="w-full max-w-xl shadow-xl rounded-2xl overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <img
            src="/user.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full border"
          />
          <h2 className="text-2xl font-semibold mt-4">{userInfo.name}</h2>
        </div>

        <div className="mt-4">
          <Label>Email Address</Label>
          <p className="text-gray-700">{userInfo.email}</p>
        </div>

        <div className="mt-4">
          <Label>Phone</Label>
          <p className="text-gray-700">{userInfo.phone}</p>
        </div>

        <div className="mt-4">
          <Label>Crédits</Label>
          <p className="text-gray-700">{userInfo.credits}</p>
        </div>

        <div className="mt-4">
          <Label>Plan</Label>
          <p className="text-gray-700">{userInfo.plan}</p>
        </div>

        <div className="mt-6 flex flex-col space-y-2">
          <Button variant="default" className="flex items-center gap-2">
            <Mail className="w-5 h-5" /> Verify Email
          </Button>
          <Button variant="default" className="flex items-center gap-2">
            <Lock className="w-5 h-5" /> Reset Password
          </Button>
          <Button onClick={()=>{signOut()}}  variant="destructive" className="flex items-center gap-2">
            <LogOut className="w-5 h-5" /> Deconnexion
          </Button>
          <Button 
            variant="destructive" className="flex items-center gap-2">
            <Delete className="w-5 h-5" /> Supprimer mon compte
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
