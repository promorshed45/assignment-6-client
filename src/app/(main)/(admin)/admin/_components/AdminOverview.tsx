'use client';
import React from 'react';
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Line } from 'react-chartjs-2';

const AdminOverview = () => {
  const data = {
    totalUsers: 150,
    totalPosts: 300,
    totalPayments: 12000,
    paymentLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    monthlyPayments: [2000, 2500, 3000, 1500, 3500],
    userLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    activeUsers: [50, 60, 70, 80, 90],
    postLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    postsOverTime: [20, 30, 25, 40],
    activityLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    platformActivity: [100, 200, 300, 400],
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-6xl">
        {/* User Management */}
        <Card>
          <CardBody>
            <h4 className="font-bold">User Management</h4>
            <p>Total Users: {data.totalUsers}</p>
            <Button color="primary" className="mt-4">Manage Users</Button>
          </CardBody>
        </Card>

        {/* Content Management */}
        <Card>
          <CardBody>
            <h4 className="font-bold">Content Management</h4>
            <p>Total Posts: {data.totalPosts}</p>
            <Button color="primary" className="mt-4">Manage Content</Button>
          </CardBody>
        </Card>

        {/* Payment Management */}
        <Card>
          <CardBody>
            <h4 className="font-bold">Payment Management</h4>
            <p>Total Payments: ${data.totalPayments}</p>
            <Button color="primary" className="mt-4">Manage Payments</Button>
          </CardBody>
        </Card>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mb-8">
        <Card>
          <CardBody>
            <h4 className="font-bold">Monthly Payments</h4>
            {/* <Line
              data={{
                labels: data.paymentLabels,
                datasets: [
                  {
                    label: 'Payments',
                    data: data.monthlyPayments,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true },
                },
              }}
            /> */}
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h4 className="font-bold">Active Users</h4>
            {/* <Line
              data={{
                labels: data.userLabels,
                datasets: [
                  {
                    label: 'Active Users',
                    data: data.activeUsers,
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true },
                },
              }}
            /> */}
          </CardBody>
        </Card>
      </div>

      {/* Additional Graphs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mb-8">
        <Card>
          <CardBody>
            <h4 className="font-bold">Total Posts Over Time</h4>
            {/* <Line
              data={{
                labels: data.postLabels,
                datasets: [
                  {
                    label: 'Posts',
                    data: data.postsOverTime,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true },
                },
              }}
            /> */}
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h4 className="font-bold">Overall Platform Activity</h4>
            {/* <Line
              data={{
                labels: data.activityLabels,
                datasets: [
                  {
                    label: 'Activity',
                    data: data.platformActivity,
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderColor: 'rgba(255, 206, 86, 1)',
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true },
                },
              }}
            /> */}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
