import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ResourceType } from "@prisma/client";

interface ResourceData {
    type: ResourceType;
    title: string;
    url?: string | null;
    notes?: string | null;
}

interface LinkData {
    title: string;
    url: string;
    description?: string | null;
}

interface CodeSnippetData {
    title: string;
    language: string;
    code: string;
    explanation?: string | null;
}

interface ConceptData {
    name: string;
    description: string;
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || "";

    if (!userId) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    try {
        const learningItems = await prisma.softwareNotes.findMany({
            where: {
                userId: parseInt(userId),
            },
        });

        if (!learningItems || learningItems.length === 0) {
            return NextResponse.json({ error: "No learning items found" }, { status: 404 });
        }

        console.log("Learning items fetched successfully:", learningItems);
        return NextResponse.json(learningItems, { status: 200 });
    } catch (error) {
        console.error("Error fetching learning items:", error);
        return NextResponse.json({ error: "Failed to fetch learning items. Please try again later." }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const { userId, formData, resources, links, codeSnippets, concepts } = await req.json();
    console.log(formData);

    try {
        const newLearningItem = await prisma.softwareNotes.create({
            data: {
                userId: parseInt(userId),
                title: formData.title,
                description: formData.description,
                status: formData.status,
                category: formData.category,
                subcategories: formData.subcategories,
                complexity: formData.complexity,
                startDate: formData.startDate ? new Date(formData.startDate) : null,
                endDate: formData.endDate ? new Date(formData.endDate) : null,
                progress: parseInt(formData.progress),
                personalNotes: formData.personalNotes,
                isPublic: formData.isPublic,

                // Nested creates for related models with type annotations
                resources: {
                    create: resources ? resources.map((resource: ResourceData) => ({
                        type: resource.type,
                        title: resource.title,
                        url: resource.url,
                        notes: resource.notes
                    })) : []
                },
                links: {
                    create: links ? links.map((link: LinkData) => ({
                        title: link.title,
                        url: link.url,
                        description: link.description
                    })) : []
                },
                codeSnippets: {
                    create: codeSnippets ? codeSnippets.map((snippet: CodeSnippetData) => ({
                        title: snippet.title,
                        language: snippet.language,
                        code: snippet.code,
                        explanation: snippet.explanation
                    })) : []
                },
                concepts: {
                    create: concepts ? concepts.map((concept: ConceptData) => ({
                        name: concept.name,
                        description: concept.description
                    })) : []
                }
            },
            include: {
                resources: true,
                links: true,
                codeSnippets: true,
                concepts: true
            }
        });

        return NextResponse.json(newLearningItem, { status: 201 });
    } catch (error) {
        console.error("Error creating learning item:", error);
        return NextResponse.json({ error: "Failed to create learning item. Please try again later." }, { status: 500 });
    }
}