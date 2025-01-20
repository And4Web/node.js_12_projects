

exports.addNewBook = async (req, res) => {
  try {
    const {title, description, category, author, publication} = req.body;

    let valErrors;
    if(req.validationErrors.length === 0 || req.validationErrors === "undefined"){
      valErrors = [];      
    }else{
      valErrors = req.validationErrors;
    }
    
    if(!req.file || req.file == {} || req.file === "undefined"){
      console.log('file >>> ', req.file, valErrors);
      // valErrors.push('Book cover is required.')
      // res.render('addBook', {error: req.validationErrors})
    }

    if(valErrors.length === 1){
      res.render('addBook', {singleError: valErrors[0]});
    }

    if(valErrors.length > 1){
      console.log("Validation Errors >>> ", valErrors);
      
      res.render('addBook', {errors: valErrors});
    }else{

      console.log("request >>>", req.body);
      console.log("request file >>>", req.file);
  
    
      res.location('/manage/books/add');
      res.redirect('/manage/books/add');
  
      res.render('addBook', {message: "New book added"});
    }

  } catch (error) {
    console.log("Server Error >>> ", error.message);
    res.render('addBook', {singleError: error.message});
  }  

}


exports.editBook = async (req, res) => {}