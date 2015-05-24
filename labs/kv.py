# -*- coding: utf-8 -*-

if __name__ == '__main__':
    kv = 'key: value://www'

    value = (kv[kv.find(':') + 1:]).strip()
    print(value)
    #value = ''
    #for v in kv.split(':'):
    #    value = value + v + ':'
    #print(value[:-1].lstrip())
