# Problem 25
# The Fibonacci sequence is defined by the recurrence relation:

# Fn = Fn - 1 + Fn-2, where F1 = 1 and F2 = 1. 
# Hence the first 12 terms will be:

# F1 = 1
# F2 = 1
# F3 = 2
# F4 = 3
# F5 = 5
# F6 = 8
# F7 = 13
# F8 = 21
# F9 = 34
# F10 = 55
# F11 = 89
# F12 = 144
# The 12th term, F12, is the first term to contain three digits.

# What is the first term in the Fibonacci sequence to contain 1000 digits?/

def fib_r(n):
	if n == 0: return 0
	if n == 1: return 1

	return fib_r(n - 1) + fib_r(n - 2);


f = {}
f[0] = 0
f[1] = 1

def fib_caching(n):
	try: 
		f[n]
	except:
		f[n] = fib_caching(n-1) + fib_caching(n-2)

	return f[n]


def fib_dp(n):
	backOne = 1
	backTwo = 0
	sumed = 0

	for i in range(0, n):
		sumed = backOne + backTwo
		backOne = backTwo
		backTwo = sumed

	return backOne + backTwo



# print fib_caching(999)
def count_digits():
	digits = 0
	n = 1
	fib = 0
	while (digits < 1000):
		n = n * 2
		fib = fib_dp(n)
		digits = len(str(fib))
	print n, fib

#count_digits()


# backOne = open('fib_500000.txt').read()
# backTwo = open('fib_499999.txt').read()

# import datetime

# print datetime.datetime.now().time()

# fib = fib_dp(1, 89, 55)
# # print len(str(fib))
# print fib

# print datetime.datetime.now().time()


print(fib_dp(int(raw_input('Large number?'))))

# print fib_r(30);

