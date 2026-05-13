import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const contestants = await prisma.contestant.findMany({
    include: { votes: true },
  });

  const leaderboard = contestants
    .map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      totalScore: c.votes.reduce((sum, v) => sum + v.weight, 0),
      devVotes: c.votes.filter((v) => v.weight === 2).length,
      staffVotes: c.votes.filter((v) => v.weight === 1).length,
    }))
    .sort((a, b) => b.totalScore - a.totalScore);

  return NextResponse.json(leaderboard);
}
