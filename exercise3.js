const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/mongo-exercises")
  .then(()=> console.log("Connected to database."))
  .catch((err)=> console.log("Could not connect to MongoDB:", err.message))
  
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses(){
  const courses = await Course
    .find({ isPublished: true })
    .or([
      {price:  {$gte: 15} },
      {name:  /.*by.*/ }
    ])
    .sort("-price")
    .select("name author price");
  
    return courses;
}

async function run(){
  const courses = await getCourses();  
  console.log(courses)
}

run();
