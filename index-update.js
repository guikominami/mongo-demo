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
  
  const course = await Course.findById(id);
  if (!course){
    console.log("no course")
    return;
  } 
  
  course.isPublished = true;
  course.author = "Guille Kominamis";
  
  const result = await course.save()
  console.log(result)
}

//updateCourseQueryFirst("6798d3e60ce75213b78a03a6");

async function updateCourseFirstUpdate(id){
  //approach: update first
  //update directly
  //optionally: get the updated document
  //, {new: true} retorna o documento alterado, se não tiver com esse set,
  //  retorna o documento original
  const result = await Course.findByIdAndUpdate(id, {
    $set: {
      author: "Guille 4",
      isPublished: false
    }
  }, {new: true});
  
  console.log(result);
}

updateCourseFirstUpdate("6798d3e60ce75213b78a03a6");


async function getCourses(){
  const courses = await Course
    .find({isPublished: false})
    .select("name author id isPublished");
  
    return courses;
}

async function run(){
  const courses = await getCourses();  
  console.log(courses)
}

run();
