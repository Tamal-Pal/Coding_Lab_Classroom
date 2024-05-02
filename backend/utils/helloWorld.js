function helloWorld(language) {
    const programs = {
        c: '#include <stdio.h>\nint main() { printf("Hello World\\n"); return 0; }',
        cpp: '#include <iostream>\nint main() { std::cout << "Hello World" << std::endl; return 0; }',
        java: 'public class HelloWorld {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}',
        javascript: 'console.log("Hello World");',
        python: 'print("Hello World")'
    };

    return programs[language.toLowerCase()] || "";
}

module.exports = helloWorld;