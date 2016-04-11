# Challenge:
# The nth term of the sequence of triangle numbers is given by, tn = 1/2n(n+1); so 
# the first ten triangle numbers are:

# 1, 3, 6, 10, 15, 21, 28, 36, 45, 55, ...

# By converting each letter in a word to a number corresponding to its alphabetical 
# position and adding these values we form a word value. For example, the word value 
# for SKY is 19 + 11 + 25 = 55 = t10. 
# If the word value is a triangle number then we shall call the word a triangle word.

# Using words.txt (right click and 'Save Link/Target As...'), a 16K text file
# containing nearly two-thousand common English words,  how many are triangle
# words?

triangle_numbers = {};
def find_triangle_numbers(n):
	for i in range(1, n + 1):
		triangle_numbers[(i * (i+1)/2)] = 1
find_triangle_numbers(100);


file_content = open('word-list.txt', 'r').read()

words = file_content.split(',')

triangle_words = 0;
for word in words:
	word = word.replace("\"", '')
	wordCount = 0
	for k in word:
		wordCount += ord(k) - 64;

	try:
		triangle_numbers[wordCount]
		triangle_words += 1
	except:
		pass



print triangle_words



