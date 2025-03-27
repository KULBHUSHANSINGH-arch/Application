import React from "react";
import { Box, Typography, TextField, Card, CardContent, Avatar, IconButton } from "@mui/material";
import { ThumbUp, ChatBubbleOutline, KeyboardArrowUp, NightsStay } from "@mui/icons-material";

const discussions = [
  { id: 1, user: "Abram Marvyn", category: "AI", time: "10 min ago", replies: 70, votes: 42, question: "Do you think BARD will overtake ChatGPT?", img: "https://randomuser.me/api/portraits/men/1.jpg" },
  { id: 2, user: "Adaline Riley", category: "AI", time: "1 hr ago", replies: 70, votes: 81, question: "What is your favorite AI project you found recently?", img: "https://randomuser.me/api/portraits/women/2.jpg" },
  { id: 3, user: "Buster Jayden", category: "Products", time: "3 hrs ago", replies: 70, votes: 29, question: "Who all are launching their Products this week?", img: "https://randomuser.me/api/portraits/men/3.jpg" },
  { id: 4, user: "Louisa Triston", category: "Ideas and Validation", time: "5 hrs ago", replies: 70, votes: 69, question: "I'm Louisa, Manager at ApexCodeStudios, Ask me anything!", img: "https://randomuser.me/api/portraits/women/4.jpg" },
];

const contributors = [
  { name: "Oliver Carpenter", discussions: 138, img: "https://randomuser.me/api/portraits/men/5.jpg" },
  { name: "Samantha Hall", discussions: 108, img: "https://randomuser.me/api/portraits/women/6.jpg" },
  { name: "Jorge Dean", discussions: 98, img: "https://randomuser.me/api/portraits/men/7.jpg" },
  { name: "Kathleen Murray", discussions: 98, img: "https://randomuser.me/api/portraits/women/8.jpg" },
  { name: "Timothy Spencer", discussions: 58, img: "https://randomuser.me/api/portraits/men/9.jpg" },
  { name: "Stacey Long", discussions: 55, img: "https://randomuser.me/api/portraits/women/10.jpg" },
  { name: "Lionel Henderson", discussions: 28, img: "https://randomuser.me/api/portraits/men/11.jpg" },
];

const Dashboard = () => {
  return (
    <Box sx={{ display: "flex",  minHeight: "100vh", padding: 2 }}>
      {/* Left Section */}
      <Box sx={{ width: "70%", paddingRight: 2 }}>
        <Box sx={{ backgroundColor: "white", padding: 2, borderRadius: 2, boxShadow: 2 }}>
          <TextField fullWidth placeholder="Search discussions..." variant="outlined" size="small" />
        </Box>
        <Box sx={{ marginTop: 2 }}>
          {discussions.map((item) => (
            <Card key={item.id} sx={{ display: "flex", alignItems: "center", padding: 2, marginBottom: 2, borderRadius: 2, boxShadow: 1 }}>
              <Avatar src={item.img} sx={{ width: 50, height: 50, marginRight: 2 }} />
              <Box>
                <Typography variant="h6">{item.question}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.user} in {item.category} · {item.time} · {item.replies} replies
                </Typography>
              </Box>
              <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                <ThumbUp sx={{ marginRight: 1, color: "#007bff" }} /> {item.votes}
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
      
      {/* Right Section */}
      <Box sx={{ width: "30%", paddingLeft: 2 }}>
        <Box sx={{ backgroundColor: "white", padding: 2, borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h6">Top Contributors</Typography>
          {contributors.map((user, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
              <Avatar src={user.img} sx={{ width: 40, height: 40, marginRight: 1 }} />
              <Typography>{user.name}</Typography>
              <Box sx={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
                <ChatBubbleOutline sx={{ marginRight: 1, color: "#ff9800" }} /> {user.discussions}
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ marginTop: 2, backgroundColor: "white", padding: 2, borderRadius: 2, boxShadow: 2 }}>
          <Typography variant="h6">New Discussions</Typography>
          <Typography variant="body2">What is one thing you are excited about?</Typography>
        </Box>
      </Box>

      {/* Floating Action Buttons */}
      <Box sx={{ position: "fixed", bottom: 20, right: 20, display: "flex", flexDirection: "column", gap: 1 }}>
        <IconButton sx={{ backgroundColor: "#00c58e", color: "white", boxShadow: 3 }}><KeyboardArrowUp /></IconButton>
        <IconButton sx={{ backgroundColor: "#ff4f4f", color: "white", boxShadow: 3 }}><NightsStay /></IconButton>
      </Box>
    </Box>
  );
};

export default Dashboard;
