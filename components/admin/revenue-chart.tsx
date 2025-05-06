"use client"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Mock data for revenue chart
const revenueData = [
  {
    name: "Jan",
    Developmental: 4000,
    Routine: 2400,
    ABA: 2400,
    Counseling: 1200,
  },
  {
    name: "Feb",
    Developmental: 4200,
    Routine: 2800,
    ABA: 2600,
    Counseling: 1400,
  },
  {
    name: "Mar",
    Developmental: 5000,
    Routine: 3200,
    ABA: 3000,
    Counseling: 1800,
  },
  {
    name: "Apr",
    Developmental: 4800,
    Routine: 3000,
    ABA: 2800,
    Counseling: 1600,
  },
  {
    name: "May",
    Developmental: 5200,
    Routine: 3400,
    ABA: 3200,
    Counseling: 2000,
  },
  {
    name: "Jun",
    Developmental: 5800,
    Routine: 3800,
    ABA: 3600,
    Counseling: 2200,
  },
]

export default function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={revenueData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Developmental" fill="#8884d8" />
        <Bar dataKey="Routine" fill="#82ca9d" />
        <Bar dataKey="ABA" fill="#ffc658" />
        <Bar dataKey="Counseling" fill="#ff8042" />
      </BarChart>
    </ResponsiveContainer>
  )
}

