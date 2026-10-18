class TestBeginReporter {
  onTestBegin(test){
    console.log("TEST_BEGIN "+test.titlePath().join(" > "));
  }
}
module.exports=TestBeginReporter;
