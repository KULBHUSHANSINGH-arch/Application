import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  InputLabel,
  Avatar,
  Slider,
} from "@mui/material";

const Create_Blog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageSize, setImageSize] = useState(250); // Default preview size

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // ✅ Live Preview
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Image:", image);
    alert("Blog Submitted!");
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setImage(null);
    setPreview(null);
    setImageSize(250); // Reset image preview size
  };

  return (
 
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "200%",
         
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          textAlign="center"
          mb={2}
          color="primary"
        >
          Create Blog
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Description */}
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          {/* Image Upload */}
          <Box sx={{ mt: 2 }}>
            <InputLabel sx={{ fontWeight: "bold", mb: 1 }}>Upload Image</InputLabel>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ width: "100%" }}
            />
          </Box>

          {/* Image Size Adjuster */}
          {preview && (
            <>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Adjust Image Size
                </Typography>
                <Slider
                  value={imageSize}
                  onChange={(e, newValue) => setImageSize(newValue)}
                  min={150}
                  max={500}
                  step={10}
                  valueLabelDisplay="auto"
                  sx={{ width: "100%" }}
                />
              </Box>

              {/* Live Image Preview */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 2,
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  overflow: "hidden",
                  p: 1,
                  backgroundColor: "#fafafa",
                }}
              >
                <Avatar
                  src={preview}
                  alt="Preview"
                  variant="square"
                  sx={{
                    width: `${imageSize}px`,
                    height: `${imageSize}px`,
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </Box>
            </>
          )}

          {/* Buttons */}
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={6}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="outlined" color="secondary" fullWidth onClick={handleCancel}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

  );
};

export default Create_Blog;
