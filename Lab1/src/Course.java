import java.util.Collection;
import java.util.Dictionary;




public class Course {

	private Collection<String> studentsList ;
	private Professor professor ;

	
	private Dictionary<String,String> studyingMaterials ;
	private Dictionary<String,String> labWorks ;
	
	private Dictionary<String,Integer > studentGrades ;
	private Dictionary<String,Integer> testResults ;
	
	
	
	public Course(Collection<String> students,Professor professor_){
		studentsList= students;
		professor=professor_;
		
	}
	
	public Professor getProfessor() {
		return professor;
		
	}
	public Collection<String> getStudentsList() {
		return studentsList;
		
	}

	public void addStudyingMaterial(String name, String material) {
		studyingMaterials.put(name, material);
		
	}
	
	public String getStudyingMaterial(String name) {
		
		return studyingMaterials.get(name);
	}
	
	public void addLabWork(String studentName, String labWork) {
		labWorks.put(studentName, labWork);
	}
	
	public String getLabWork(String studentName) {
		
		return labWorks.get(studentName);
	}
	
	
	public void setGrades(String studentName, Integer grade) {
		studentGrades.put(studentName, grade);
	}
	
	public Integer getGrades(String studentName) {
		return studentGrades.get(studentName);
	}
	
	
	public Integer takeTest(String studentName,String knowledge) {
		Integer result=0;
		//считаем результат
		testResults.put(studentName,result);
		
		return result;
	}
	
	
	
}