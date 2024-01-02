package com.examly.springapp;
import java.io.File;
import org.springframework.http.MediaType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = SpringappApplication.class)
@AutoConfigureMockMvc

class SpringappApplicationTests {

 
    @Autowired
    private  MockMvc mockMvc ;
    @Test

    void testaddBus() throws Exception{    

        String st = "{\"id\":1000,\"name\": \"demo\",\"capacity\": 56,\"servicedate\": \"2023-10-22\" ,\"Kilometer\": \"19586\", \"BusType\": \"demotype\"}";
         mockMvc.perform(MockMvcRequestBuilders.post("/addBus")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(st)
                    .accept(MediaType.APPLICATION_JSON))
                    .andExpect(MockMvcResultMatchers.status().isOk())
                    .andReturn();

    }

    @Test
    void testgetAllBus() throws Exception{
         mockMvc.perform(get("/getAllBus")
                        .accept(MediaType.APPLICATION_JSON))
                        .andDo(print())
                        .andExpect(status().isOk())
                        .andExpect(jsonPath("$").isArray())
                        .andReturn();

    }


    @Test 
    public void test_Controller_Directory_Exists() { 
        String directoryPath = "src/main/java/com/examly/springapp/controller"; // Replace with the path to your directory 
        File directory = new File(directoryPath); 
        assertTrue(directory.exists() && directory.isDirectory()); 
    }
    
    @Test 
    public void test_ApiController_File_Exists() { 
        String filePath = "src/main/java/com/examly/springapp/controller/ApiController.java"; // Replace with the path to your file 
        File file = new File(filePath); 
        assertTrue(file.exists() && file.isFile()); 
    }

    @Test 
    public void test_model_Directory_Exists() { 
        String directoryPath = "src/main/java/com/examly/springapp/model"; // Replace with the path to your directory 
        File directory = new File(directoryPath); 
        assertTrue(directory.exists() && directory.isDirectory()); 
    }
    
    @Test 
    public void test_Bus_File_Exists() { 
        String filePath = "src/main/java/com/examly/springapp/model/Bus.java"; // Replace with the path to your file 
        File file = new File(filePath); 
        assertTrue(file.exists() && file.isFile()); 
    }

    @Test 
    public void test_Repository_Folder_Exists() { 
        String directoryPath = "src/main/java/com/examly/springapp/repository"; // Replace with the path to your directory 
        File directory = new File(directoryPath); 
        assertTrue(directory.exists() && directory.isDirectory()); 
    }
    
    @Test 
   
    public void test_Service_Folder_Exists() { 
        String directoryPath = "src/main/java/com/examly/springapp/service"; // Replace with the path to your directory 
        File directory = new File(directoryPath); 
        assertTrue(directory.exists() && directory.isDirectory()); 
    }

    @Test 
   
    public void test_congifuration_Folder_Exists() { 
        String directoryPath = "src/main/java/com/examly/springapp/configuration"; // Replace with the path to your directory 
        File directory = new File(directoryPath); 
        assertTrue(directory.exists() && directory.isDirectory()); 
    }

    @Test
    public void test_ApiController_Class_Exists() {
        checkClassExists("com.examly.springapp.controller.ApiController");
    }

    @Test
    public void test_BusRepo_Class_Exists() {
        checkClassExists("com.examly.springapp.repository.BusRepo");
    }

    @Test
    public void test_BusService_Class_Exists() {
        checkClassExists("com.examly.springapp.service.BusService");
    }

    @Test
    public void test_BusModel_Class_Exists() {
        checkClassExists("com.examly.springapp.model.Bus");
    }

    @Test
    public void test_Bus_Model_Has_id_Field() {
        checkFieldExists("com.examly.springapp.model.Bus", "id");
    }

    @Test
    public void test_Bus_Model_Has_name_Field() {
        checkFieldExists("com.examly.springapp.model.Bus", "name");
    }

    @Test
    public void test_Bus_Model_Has_capacity_Field() {
        checkFieldExists("com.examly.springapp.model.Bus", "capacity");
    }

    @Test
    public void test_Bus_Model_Has_servicedate_Field() {
        checkFieldExists("com.examly.springapp.model.Bus", "servicedate");
    }


    @Test
    public void test_Bus_Model_Has_Kilometer_Field() {
        checkFieldExists("com.examly.springapp.model.Bus", "Kilometer");
    }

    @Test
    public void test_Bus_Model_Has_BusType_Field() {
        checkFieldExists("com.examly.springapp.model.Bus", "BusType");
    }

    @Test
    public void test_BusRepo_Extends_JpaRepository() {
        checkClassImplementsInterface("com.examly.springapp.repository.BusRepo", "org.springframework.data.jpa.repository.JpaRepository");
    }

  
  
     private void checkClassExists(String className) {
        try {
            Class.forName(className);
        } catch (ClassNotFoundException e) {
            fail("Class " + className + " does not exist.");
        }
    }

    private void checkFieldExists(String className, String fieldName) {
        try {
            Class<?> clazz = Class.forName(className);
            clazz.getDeclaredField(fieldName);
        } catch (ClassNotFoundException | NoSuchFieldException e) {
            fail("Field " + fieldName + " in class " + className + " does not exist.");
        }
    }

    private void checkClassImplementsInterface(String className, String interfaceName) {
        try {
            Class<?> clazz = Class.forName(className);
            Class<?> interfaceClazz = Class.forName(interfaceName);
            assertTrue(interfaceClazz.isAssignableFrom(clazz));
        } catch (ClassNotFoundException e) {
            fail("Class " + className + " or interface " + interfaceName + " does not exist.");
        }
    }


}

 