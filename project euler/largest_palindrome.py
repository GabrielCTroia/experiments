# A palindromic number reads the same both ways. The largest palindrome made
# from the product of two 2-digit numbers is 9009 = 91 x 99.



# Find the largest palindrome made from the product of two 3-digit numbers.

import math

def find_largest_palindrome(limit):
	largest_palindrom = 0
	bo = 0

	for x in range(limit, 0, -1):
		for y in range(limit, 0, -1):
			prod = (x * y)
			bo += 1
			if is_palindrome(prod) and prod > largest_palindrom:
				print largest_palindrom, 'changed to', prod, x, y
				largest_palindrom = prod
				
	print bo
	return largest_palindrom

def is_palindrome(n):
	n = str(n)
	return n[:len(n)/2] == n[int(math.ceil(len(n)/float(2))):][::-1] # reverse it!


print find_largest_palindrome(999)