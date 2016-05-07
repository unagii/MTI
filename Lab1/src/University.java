import java.util.Dictionary;



public class University {

	public String name;
	public String address;
	
	private Dictionary<String,Faculty> facultys ;
	
	
	public University(){
	
	};
	
	public void addFaculty(String name,Faculty faculty) {
		facultys.put(name, faculty);
	}

	public Faculty getFacultyByName(String name) {
		return  facultys.get(name);
	}


	

	
	

}
