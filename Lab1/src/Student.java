import java.util.Dictionary;


public class Student {

	public String firstName;
	public String lastName;
	
	private Dictionary<String,Course> courses ;
	private Dictionary<String,String> knowledges ;
	
	
	public Student(){
		
	}
	
	public void addCourse(String name,Course course) {
		courses.put(name, course);
		startCourse(name);
	}
	
	public Course getCourse(String courseName) {
		return  courses.get(courseName);
	}
	
	
	private void startCourse(String courseName) {
		
		Course course =  courses.get(courseName);
		
		String lecture =course.getStudyingMaterial("�������� ������");
		learnLecture(lecture);
		
		String labWorkMaterial =course.getStudyingMaterial("�������� ������������ ������");
		String labWork = makeLabWork(labWorkMaterial);
		course.addLabWork(firstName, labWork);
		
		askQuestion(courseName,"������ �� ����������� ���������");
		
		takeTest(courseName);
		
		Integer courseGrade = course.getGrades(lastName);
	
	}
	
	private void learnLecture(String lecture) {
		//���� ������
		knowledges.put("�������� ������", lecture);
				
	}
	
	////////////////////////////////////////////////////////////////////
	private String makeLabWork(String labWorkMaterial) {
		//���������� ������
		String lecture = knowledges.get("�������� ������");
		//�� ������ ������ � ���������� ��� ������������ ������ ������ ������������ ������.
		String labWork=labWorkMaterial+lecture;
		knowledges.put("������������ ������",labWork );
		
		return labWork;
	}
	
	
	private void takeTest(String courseName) {
		//���������� �� ���� �������
		String theory = knowledges.get("�������� ������");
		String practice = knowledges.get("������������ ������");
		String knowledge=theory+practice;
		
		//����� ����
		Course course = getCourse(courseName);
		course.takeTest(firstName,knowledge);
		
	}
	
	
	public void askQuestion(String courseName, String question) {
		Course course = getCourse(courseName);
		Professor prodessor = course.getProfessor();
		prodessor.answerQuestion(question);
		//return "Random Answer for Question: " + question;
	}
	
	
}
