from __future__ import print_function

import os
import random
import subprocess
import sys

procs = {}


def say_in_bg(command, key):
    print(command)
    say = 'say '
    say += command
    pid = subprocess.Popen([say], stdout=subprocess.PIPE, shell=True).pid
    if key not in procs:
        procs[key] = set()
    procs[key].add(pid)


def say_word(words, chance_of_word_out_of_100):
    string = ''
    for i in range(200):
        num = random.randint(1, 100)
        if num < chance_of_word_out_of_100 or string == '' or string[len(string) - 1] == ' ':
            string += words[random.randint(0, len(words) - 1)]
        else:
            string += ' '
    say_in_bg(string, str(words))


def say_three_digits(digitses, chance_of_word_out_of_100):
    string = ''
    for i in range(200):
        num = random.randint(1, 100)
        if num < chance_of_word_out_of_100 or string == '' or string[len(string) - 1] == ' ':
            if string[(len(string) - 3):len(string)] in digitses:
                string += ','
            string += digitses[random.randint(0, len(digitses) - 1)]
        else:
            string += ' '
    say_in_bg(string, str(digitses))


def remove_proc(key):
    try:
        pid = procs[key].pop()
        command = 'kill ' + str(pid)
        os.system(command)
    except Exception:
        pass


def remove_all_say():
    proc = subprocess.Popen(['pgrep say'], stdout=subprocess.PIPE, shell=True)
    (out, err) = proc.communicate()
    pids = out.strip().split('\n')
    for pid in pids:
        os.system('kill ' + pid)


usage = 'Commands: \n' \
        '  exit\n' \
        '  silence\n' \
        '  + word_1 word_2 word_3 ...\n' \
        '  - word_1 word_2 word_3 ...\n' \
        '  concatenation_rating + word_1 word_2 word_3\n' \
        'Examples: \n' \
        '  + rebecca\n' \
        '  + kla klak\n' \
        '  70 + e\n' \
        '  + 789\n'
def parse(command):
    try:
        tokens = command.split()
        if tokens[0] == 'exit':
            sys.exit(0)
        elif tokens[0] == 'silence':
            remove_all_say()
            return
        if tokens[0].isdigit():
            chance_of_word_out_of_100 = int(tokens[0])
            command = tokens[1]
            words = tokens[2:]
        else:
            chance_of_word_out_of_100 = 50
            command = tokens[0]
            words = tokens[1:]
        if command != '+' and command != '-':
            raise Exception('Command not formatted properly.')
        if command == '+':
            bignum = True
            for word in words:
                if len(word) != 3 or not word.isdigit():
                    bignum = False
                    break
            if bignum:
                say_three_digits(words, chance_of_word_out_of_100)
            else:
                say_word(words, chance_of_word_out_of_100)
        else:
            remove_proc(str(words))
    except Exception:
        print('NOT WORK NO NO YOU WRONG')

os.system('clear')
print('Hello! Welcome to ~word salad~ THE GAME.\n\n')
print(usage)

while True:
    print(u'\u266B', end="")
    command = raw_input(' ')
    parse(command)
