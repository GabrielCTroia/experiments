# import <stdio.h>

// forward declarations
// void pr(int[] d);

int main (int argc, char *argv[])
{
	printf("Working\n");

	int i = 0;
	for (i = 1; i < argc; i++) {
		printf("arg %d: %s\n", i, argv[i]);
	}

	// int ages[] = {213, 45, 1};

	// int *a = ages;


	// pr(a);

	return 0;
}

// void pr(int[] d) {
// 	printf("yes it's working: %d, %d\n", d[0], d[1]);
// }