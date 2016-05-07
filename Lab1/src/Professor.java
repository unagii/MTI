import java.util.Collection;
import java.util.Dictionary;
import java.util.Iterator;


public class Professor {

	public String firstName;
	public String lastName;
	
	private Dictionary<String,Course> courses ;

	public Professor(){
		
		
		
	}
	
	public void addCourse(String name,Course course) {
		courses.put(name, course);
		
		startCourse(name);
	}

	public Course getCourseByName(String courseName) {
		return  courses.get(courseName);
	}
	
	
	private void startCourse(String courseName) {
	
		Course course =  courses.get(courseName);
		
		String lecture = makeLectureMaterial(courseName);
		course.addStudyingMaterial("������ �� "+courseName, lecture);
		
		String labWorkMaterial = makeLabWorkMaterial(courseName);
		course.addStudyingMaterial("������������ ��������� �� ���� "+courseName, labWorkMaterial);
		
		gradeLabWorks(courseName);
	}
	
	
	private String makeLectureMaterial(String courseName) {
		return  "����� ���������� �������� �� �����: "+courseName;
	}
	
	
	private String makeLabWorkMaterial(String courseName) {
		return  "����� ������������ ��������� �� �����: "+courseName;
	}
	
	
	
	private void gradeLabWorks(String courseName ) {
		Course course =  courses.get(courseName);
		
		Collection<String> students=course.getStudentsList();
		
		Iterator<String> itr = students.iterator();
	    while(itr.hasNext()) {
	    	String studentName = itr.next();//.toString();
	    	course.getLabWork(studentName);
	    	//��������� ������
	    	Integer grade=0;
	    	course.setGrades(studentName, grade);
	    }
	}
	
	
	public String answerQuestion(String question) {
		//���������� ������
		return "Random Answer for Question: " + question;
	}
	
	
	
	
}
