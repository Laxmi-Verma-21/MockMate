"use client"
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, Home, Inbox, Plus, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SideBarOptions } from '@/services/Constants';
import { usePathname } from 'next/navigation';

export function AppSidebar() {
  const path=usePathname();
  console.log(path);


  return (
    <Sidebar>
            <SidebarHeader className='flex items-center'>
                  <Image src={'/logo.png'} alt="logo" 
                  height={120}
                  width={120}
                  className='w-{150}'
                  />
                  <Button className='w-full'><Plus/> Create New Interview </Button>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarContent>
                  <SidebarMenu>
                    {
                      SideBarOptions.map((option,index)=>(
                        <SidebarMenuItem key={index} className='p-1'>
                          <SidebarMenuButton asChild className={`p-5 ${path==option.path && 'bg-blue-100'}`}>
                            <Link href={option.path}>
                              <option.icon className={`text-[18px] ${path==option.path && 'text-primary'}`}/>
                              <span className={`text-[18px] font-medium ${path==option.path && 'text-primary'}`}>{option.name}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))
                    }
                  </SidebarMenu>
                </SidebarContent>
              </SidebarGroup>
            </SidebarContent>
    </Sidebar>
  )
}