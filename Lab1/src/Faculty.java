import java.util.Collection;
import java.util.Dictionary;


public class Faculty {

	public String name;

	private Dictionary<String,Student> students ;
	private Dictionary<String,Professor> professors ;
	private Dictionary<String,Course> courses ;
	
	
	public Faculty(){
		
	}
	
	public void addCourse(String name) {
		//составляем списки студентов
		Collection<String> students=null;
		//выбираем профессора
		Professor professor= null;
		
		//создаем новый курс
		Course course= new Course(students,professor);
		courses.put(name,course );
	}

	public Course getCourseByName(String name) {
		return  courses.get(name);
	}
	
	
	public void addProfessor(String name,Professor professor) {
		professors.put(name, professor);
	}

	public Professor getProfessorByName(String name) {
		return  professors.get(name);
	}
	
	
	
	public void addStudent(String name,Student student) {
		students.put(name, student);
	}

	public Student getStudentByName(String name) {
		return  students.get(name);
	}

	
	
	
	
}
