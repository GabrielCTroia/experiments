# The prime factors of 13195 are 5, 7, 13 and 29.

# What is the largest prime factor of the number 600851475143 ?

import math

def find_dividers(n):
	original_n = n
	max_limit = int(math.sqrt(n))
	print 'sqrt =', max_limit

	divs = []
	prime_divs = []

	div = 2
	bo = 0
	while (n > 1):
		if n % div == 0:
			n = n/div
			divs.append(div)
			
			if (check_prime(div)):
				prime_divs.append(div)
		
		div += 1
		bo += 1
		# print div

	print bo, 'basic operations'
	print 'ratio:', str(original_n) + '/' + str(bo), original_n/bo
	return divs


# took from: http://stackoverflow.com/questions/6800193/what-is-the-most-efficient-way-of-finding-all-the-factors-of-a-number-in-python
# def factors(n):    
#     return set(reduce(list.__add__, 
#                 ([i, n//i] for i in range(1, int(n**0.5) + 1) if n % i == 0)))

# def factors(n):    
#     result = set()
#     bo = 0
#     for i in range(1, int(n ** 0.5) + 1):
#         div, mod = divmod(n, i)
#         if mod == 0:
#             result |= {i, div}
#         bo += 1
#     print bo, 'basic operations'
#     return result

def check_prime(n):
	c = 2
	while c < math.sqrt(n) + 1:
		if n % c == 0:
			return False 
		c += 1

	return True

# print (find_dividers(600851475143))
print (find_dividers(int(raw_input('large number? '))))

# print (check_prime(int(raw_input('prime? '))))