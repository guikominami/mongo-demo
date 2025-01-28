const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err.message));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Node JS Course",
    author: "Mosh",
    tags: ["angular", "backend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

createCourse();

async function getCoursesByProperties() {
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

getCoursesByProperties();

async function getCoursesByLimits() {
  
  //eq: equal
  //ne: not equal
  //gt: greater than
  //gte: greater than or equal to
  //lt: less than
  //lte: less than or equal to
  //in: 
  //nin: not in
  
  const courses = await Course
    .find({
      //price: { $gte: 10, $lte: 20 }
      //price: { $in: [10, 15, 20] }
    })
    .or([{ author: "Mosh"}, {isPublished: true}])
    .and([{  }])
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  
  console.log(courses);
}

getCoursesByLimits();


async function getCoursesByRegEx() {
  
  const courses = await Course
    //starts with Mosh
    .find({ author: /^Mosh/ })
    //end with (case insensitive colocar i)
    .find({ author: /Hamedani$/i })
    //contains
    .find({ author: /.*Hamedani.*/i })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  
  console.log(courses);
}

getCoursesByRegEx();

async function getCountCourses() {
  const courses = await Course
    .find({
      author: "Mosh",
      isPublished: true,
    })
    .limit(10)
    .sort({ name: 1 })
    .countDocuments();
  
  console.log("Quantity: ", courses);
}

getCountCourses();


async function getCoursesPagination() {
  
  const pageSize = 10;
  const pageNumber = 2;
  
  const courses = await Course
    .find({
      author: "Mosh",
      isPublished: true,
    })
    .skip((pageNumber - 1) * pageSize)
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  
  console.log(courses);
}

getCoursesByProperties();