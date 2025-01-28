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

async function updateCourseQueryFirst(id){
  //Approach: query first
  //find by id
  //modify its properties
  //save()
  
  const course = await Course.find({_id : id});
  if (!course){
    console.log("no id")
    return;
  } 
  console.log(course)
  
  course.isPublished = true;
  course.author = "Another Author";
  
  //const result = await course.save()
 // console.log(result)
}

updateCourseQueryFirst("5a68fdc3615eda645bc6bdec");

async function updateCourse(id){
  //Approach: query first
  //find by id
  //modify its properties
  //save()
  
  //approach: update first
  //update directly
  //optionally: get the updated document
  
  
  
}

updateCourse();


// async function getCourses(){
//   const courses = await Course
//     .find({isPublished: true})
//     .select("name author id");
  
//     return courses;
// }

// async function run(){
//   const courses = await getCourses();  
//   console.log(courses)
// }

//run();
