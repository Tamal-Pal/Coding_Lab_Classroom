function helloWorld(language) {
    const programs = {
        c: '#include <stdio.h>\nint main() {\n printf("Hello World");\n return 0;\n}',
        cpp: '#include <iostream>\nint main() {\n std::cout << "Hello World" << std::endl;\n return 0;\n}',
        java: 'public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}',
        javascript: 'console.log("Hello World");',
        python: 'print("Hello World")'
    };

    return programs[language.toLowerCase()] || "";
}

module.exports = helloWorld;