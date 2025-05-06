// REVIEWED: 2025-05-05 - Good to go ✅
"use client"
import Banking from "./main_components/Banking"
import Stats from "./main_components/Stats"
import ProjectTable from "./main_components/ProjectTable"
import UsersTable from "./main_components/UsersTable"
import Timeline from "./main_components/Timeline"
import { useEffect, useState } from 'react';
import { useSession } from "next-auth/react"
import { useTheme } from "@/app/context/ThemeContext"
import { showToast } from "../reusable/Toasters"
import { BankDetails } from "@/app/types/dashmain"

export default function Main() {
    // States & Hooks
    const { data: session } = useSession();
    const { savedTheme } = useTheme();
    const [bankDetails, setBankDetails] = useState<BankDetails>({ totalBalance: 0, depositThisMonth: 0, withdrawThisMonth: 0, });
    const [projects, setProjects] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!session) return;
        const fetchBankDetails = async () => {
            try {
                const response = await fetch(`/api/bankDetails/${session?.user.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (!response.ok && response.status === 404) {
                    showToast("error", "Bank details not found. Please check your user ID.", savedTheme);
                    return;
                }

                const data = await response.json();
                setBankDetails({
                    totalBalance: data.totalBalance || 0,
                    depositThisMonth: data.depositThisMonth || 0,
                    withdrawThisMonth: data.withdrawThisMonth || 0,
                })

            } catch (error) {
                console.error("Error fetching bank details:", error);
                showToast("error", "Error fetching bank details. Please try again.", savedTheme);
            }
        }
        fetchBankDetails();
    }, [session, savedTheme]);

    // Fetch Projects Details
    useEffect(() => {
        if (!session) return;
        const fetchProjects = async () => {
            try {
                const response = await fetch(`/api/projects/personal/${session?.user.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (!response.ok && response.status === 404) {
                    showToast("error", "Projects not found. Please check your user ID.", savedTheme);
                    return;
                }

                const data = await response.json();
                setProjects(data.projects || []);

            } catch (error) {
                console.error("Error fetching projects:", error);
                showToast("error", "Error fetching projects. Please try again.", savedTheme);
            }
        }
        fetchProjects();
    }, [session, savedTheme])


    // Fetch Timeline Details
    useEffect(() => {
        if (!session) return;
        const fetchTimeline = async () => {
            try {
                const response = await fetch(`/api/timeline/${session?.user.id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (!response.ok && response.status === 404) {
                    showToast("error", "Timeline not found. Please check your user ID.", savedTheme);
                    return;
                }

                const data = await response.json();
                setTimeline(data.timeline || []);

            } catch (error) {
                console.error("Error fetching timeline:", error);
                showToast("error", "Error fetching timeline. Please try again.", savedTheme);
            }
        }

        fetchTimeline();
    }, [session, savedTheme])

    // Fetch Users Details
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`/api/users`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (!response.ok) {
                    showToast("error", "Failed to fetch users data", savedTheme);
                    return;
                }

                const data = await response.json();
                // Direct assignment since API returns array directly
                setUsers(data || []);

            } catch (error) {
                console.error("Error fetching users:", error);
                showToast("error", "Error fetching users. Please try again.", savedTheme);
            }
        }

        fetchUsers();
    }, [session, savedTheme])


    return (
        <>
            <div className="p-4">
                <div className="flex flex-col xl:flex-row gap-4">
                    <Banking bankDetails={bankDetails} />
                    <Stats />
                </div>
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="xl:w-2/3 w-full">
                        <ProjectTable projects={projects} />
                    </div>
                    <Timeline timeline={timeline} />
                </div>
                <UsersTable users={users} />
            </div>
        </>
    )
}