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
		
		String lecture =course.getStudyingMaterial("название лекции");
		learnLecture(lecture);
		
		String labWorkMaterial =course.getStudyingMaterial("название лабораторной работы");
		String labWork = makeLabWork(labWorkMaterial);
		course.addLabWork(firstName, labWork);
		
		askQuestion(courseName,"вопрос по пройденному материалу");
		
		takeTest(courseName);
		
		Integer courseGrade = course.getGrades(lastName);
	
	}
	
	private void learnLecture(String lecture) {
		//учим лекцию
		knowledges.put("Материал лекций", lecture);
				
	}
	
	////////////////////////////////////////////////////////////////////
	private String makeLabWork(String labWorkMaterial) {
		//вспоминаем лекцию
		String lecture = knowledges.get("Материал лекций");
		//на основе лекций и материалов для лабораторной работы делаем лабораторную работу.
		String labWork=labWorkMaterial+lecture;
		knowledges.put("Практические навыки",labWork );
		
		return labWork;
	}
	
	
	private void takeTest(String courseName) {
		//вспоминаем всё чему учились
		String theory = knowledges.get("Материал лекций");
		String practice = knowledges.get("Практические навыки");
		String knowledge=theory+practice;
		
		//здаем тест
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
