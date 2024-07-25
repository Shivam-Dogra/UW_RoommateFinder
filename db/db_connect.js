import { connect, Schema, model } from "mongoose";

// Connect to MongoDB
connect("mongodb://localhost:27017/roommateFinder", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the schema
const personSchema = new Schema({
  fullName: { type: String, required: true },
  gender: { type: String, required: true },
  graduationYear: { type: Number, required: true },
  enrolledCourse: { type: String, required: true },
  profileImage: { type: String, required: false }, // URL or path to the image
  plannedNeighbourhood: { type: String, required: true },
  currentLivingIn: { type: String, required: true },
  major: { type: String, required: true },
  hometown: { type: String, required: true },
  budget: { type: Number, required: true },
  accommodationFound: { type: Boolean, required: true },
  leaseDuration: { type: String, required: true },
  email: { type: String, required: true },
  wantsToFormGroup: { type: Boolean, required: true },
});

// Create the model
const Person = model("Person", personSchema);

// Example: Create a new person
const newPerson = new Person({
  fullName: "John Doe",
  gender: "Male",
  graduationYear: 2024,
  enrolledCourse: "Computer Science",
  profileImage: "http://example.com/profile.jpg", // Example URL
  plannedNeighbourhood: "Downtown",
  currentLivingIn: "Campus Housing",
  major: "Software Engineering",
  hometown: "New York",
  budget: 1000,
  accommodationFound: false,
  leaseDuration: "12 months",
  email: "john.doe@example.com",
  wantsToFormGroup: true,
});

newPerson
  .save()
  .then(() => console.log("Person saved!"))
  .catch((err) => console.log("Error:", err));
