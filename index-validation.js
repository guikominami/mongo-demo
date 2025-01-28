const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/mongo-exercises")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err.message));

const courseSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    minlength: 5,
    maxlength: 255
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"]  //only these values are valid
  },
  author: String,
  tags: { 
    type: Array ,
    validate: {
      validator: function(v) {
        return v.length > 0;
      }
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: { 
    type: Number, 
    required: function() { return this.isPublished; },
    min: 10,
    max: 200
  }
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Node JS Course",
    category: "-",
    author: "Mosh",
    tags: ["angular", "backend"],
    isPublished: true,
    price: 12
  });
  
  try {
    const result = await course.save();
    console.log(result);
      
  } catch (ex) {
    console.log(ex.message);
  }
}

createCourse();

async function getCourses() {
  const courses = await Course
    .find({
      author: "Mosh",
      isPublished: true,
    })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  
  console.log(courses);
}

//getCourses();

