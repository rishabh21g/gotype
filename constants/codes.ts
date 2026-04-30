// constants/code.ts

export const codeSnippets: Record<string, string[]> = {
  JavaScript: [
    `function debounce(fn, delay) { let timer; return function (...args) { clearTimeout(timer); timer = setTimeout(() => fn.apply(this, args), delay); }; }`,
    `const fetchUser = async (id) => { try { const res = await fetch('/api/users/' + id); if (!res.ok) throw new Error('Not found'); return await res.json(); } catch (err) { console.error(err); return null; } };`,
    `const flatten = (arr) => arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);`,
    `class EventEmitter { constructor() { this.events = {}; } on(event, cb) { (this.events[event] ||= []).push(cb); } emit(event, ...args) { (this.events[event] || []).forEach(cb => cb(...args)); } }`,
  ],

  TypeScript: [
    `type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]; };`,
    `function groupBy<T, K extends keyof T>(arr: T[], key: K): Record<string, T[]> { return arr.reduce((acc, item) => { const group = String(item[key]); (acc[group] ||= []).push(item); return acc; }, {} as Record<string, T[]>); }`,
    `async function retry<T>(fn: () => Promise<T>, attempts: number): Promise<T> { try { return await fn(); } catch (err) { if (attempts <= 1) throw err; return retry(fn, attempts - 1); } }`,
    `type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E }; const ok = <T>(value: T): Result<T> => ({ ok: true, value }); const err = <E>(error: E): Result<never, E> => ({ ok: false, error });`,
  ],

  Python: [
    `def memoize(fn): cache = {}; return lambda *args: cache.setdefault(args, fn(*args))`,
    `from functools import reduce; def compose(*fns): return reduce(lambda f, g: lambda x: f(g(x)), fns)`,
    `def chunk(lst, size): return [lst[i:i + size] for i in range(0, len(lst), size)]`,
    `class Singleton: _instance = None; def __new__(cls, *args, **kwargs): if not cls._instance: cls._instance = super().__new__(cls); return cls._instance`,
    `def flatten(lst): return [x for sub in lst for x in (flatten(sub) if isinstance(sub, list) else [sub])]`,
  ],

  Rust: [
    `fn fibonacci(n: u64) -> u64 { match n { 0 => 0, 1 => 1, _ => fibonacci(n - 1) + fibonacci(n - 2), } }`,
    `use std::collections::HashMap; fn word_count(s: &str) -> HashMap<&str, usize> { let mut map = HashMap::new(); for word in s.split_whitespace() { *map.entry(word).or_insert(0) += 1; } map }`,
    `fn binary_search<T: Ord>(arr: &[T], target: &T) -> Option<usize> { let (mut lo, mut hi) = (0, arr.len()); while lo < hi { let mid = lo + (hi - lo) / 2; match arr[mid].cmp(target) { std::cmp::Ordering::Equal => return Some(mid), std::cmp::Ordering::Less => lo = mid + 1, std::cmp::Ordering::Greater => hi = mid, } } None }`,
  ],

  Go: [
    `func Map[T, U any](s []T, f func(T) U) []U { result := make([]U, len(s)); for i, v := range s { result[i] = f(v) }; return result }`,
    `func Filter[T any](s []T, f func(T) bool) []T { var out []T; for _, v := range s { if f(v) { out = append(out, v) } }; return out }`,
    `func Must[T any](v T, err error) T { if err != nil { panic(err) }; return v }`,
    `func Retry(attempts int, fn func() error) error { for i := 0; i < attempts; i++ { if err := fn(); err == nil { return nil } }; return fmt.Errorf("failed after %d attempts", attempts) }`,
  ],

  "C++": [
    `template<typename T> T clamp(T val, T lo, T hi) { return val < lo ? lo : val > hi ? hi : val; }`,
    `template<typename It, typename Pred> It partition(It first, It last, Pred p) { while (first != last) { while (p(*first)) if (++first == last) return first; do { if (--last == first) return first; } while (!p(*last)); std::iter_swap(first, last); ++first; } return first; }`,
    `template<typename T> class Stack { std::vector<T> data; public: void push(T v) { data.push_back(v); } void pop() { data.pop_back(); } T& top() { return data.back(); } bool empty() const { return data.empty(); } };`,
  ],

  Java: [
    `public static <T extends Comparable<T>> T max(List<T> list) { return list.stream().max(Comparator.naturalOrder()).orElseThrow(NoSuchElementException::new); }`,
    `public static Map<String, Long> frequency(List<String> words) { return words.stream().collect(Collectors.groupingBy(Function.identity(), Collectors.counting())); }`,
    `public static <T> Optional<T> findFirst(List<T> list, Predicate<T> pred) { return list.stream().filter(pred).findFirst(); }`,
  ],

  Kotlin: [
    `fun <T> List<T>.chunked(size: Int): List<List<T>> = (indices step size).map { subList(it, minOf(it + size, this.size)) }`,
    `inline fun <T, R> T.letIf(condition: Boolean, block: (T) -> R): R? = if (condition) block(this) else null`,
    `fun String.toSlug(): String = lowercase().replace(Regex("[^a-z0-9]+"), "-").trim('-')`,
    `suspend fun <T> retry(times: Int, block: suspend () -> T): T { repeat(times - 1) { runCatching { return block() } }; return block() }`,
  ],

  Swift: [
    `func memoize<T: Hashable, U>(_ fn: @escaping (T) -> U) -> (T) -> U { var cache = [T: U](); return { cache[$0] ?? { let v = fn($0); cache[$0] = v; return v }($0) } }`,
    `extension Array { func chunked(into size: Int) -> [[Element]] { stride(from: 0, to: count, by: size).map { Array(self[$0 ..< Swift.min($0 + size, count)]) } } }`,
    `extension Collection { var isNotEmpty: Bool { !isEmpty }; func count(where predicate: (Element) -> Bool) -> Int { filter(predicate).count } }`,
  ],

  Ruby: [
    `def memoize(fn) = ->(cache = {}) { ->(*args) { cache.key?(args) ? cache[args] : (cache[args] = fn.(*args)) } }.()`,
    `class Array; def frequencies = tally; def sum_by(&block) = sum(0, &block); end`,
    `def deep_merge(h1, h2) = h1.merge(h2) { |_, v1, v2| v1.is_a?(Hash) && v2.is_a?(Hash) ? deep_merge(v1, v2) : v2 }`,
  ],

  PHP: [
    `function array_pluck(array $arr, string $key): array { return array_map(fn($item) => $item[$key] ?? null, $arr); }`,
    `function memoize(callable $fn): callable { $cache = []; return function() use ($fn, &$cache) { $key = serialize(func_get_args()); return $cache[$key] ??= $fn(...func_get_args()); }; }`,
    `function pipe(mixed $value, callable ...$fns): mixed { return array_reduce($fns, fn($carry, $fn) => $fn($carry), $value); }`,
  ],

  "C#": [
    `public static IEnumerable<IEnumerable<T>> Chunk<T>(this IEnumerable<T> source, int size) => source.Select((x, i) => (x, i)).GroupBy(t => t.i / size).Select(g => g.Select(t => t.x));`,
    `public static async Task<T> RetryAsync<T>(Func<Task<T>> fn, int attempts) { for (int i = 0; i < attempts - 1; i++) { try { return await fn(); } catch { } } return await fn(); }`,
    `public static Dictionary<TKey, List<T>> GroupBy<T, TKey>(IEnumerable<T> source, Func<T, TKey> key) where TKey : notnull => source.GroupBy(key).ToDictionary(g => g.Key, g => g.ToList());`,
  ],

  Haskell: [
    `chunksOf :: Int -> [a] -> [[a]]; chunksOf _ [] = []; chunksOf n xs = take n xs : chunksOf n (drop n xs)`,
    `memoize :: (Int -> a) -> Int -> a; memoize f = (map f [0..] !!); fibonacci :: Int -> Int; fibonacci = memoize (\\n -> if n < 2 then n else fibonacci (n-1) + fibonacci (n-2))`,
    `safeHead :: [a] -> Maybe a; safeHead [] = Nothing; safeHead (x:_) = Just x; safeLast :: [a] -> Maybe a; safeLast [] = Nothing; safeLast [x] = Just x; safeLast (_:xs) = safeLast xs`,
  ],

  Lua: [
    `function map(t, fn) local result = {} for i, v in ipairs(t) do result[i] = fn(v) end return result end`,
    `function filter(t, pred) local result = {} for _, v in ipairs(t) do if pred(v) then result[#result+1] = v end end return result end`,
    `function memoize(fn) local cache = {} return function(x) if cache[x] == nil then cache[x] = fn(x) end return cache[x] end end`,
    `function reduce(t, fn, acc) for _, v in ipairs(t) do acc = fn(acc, v) end return acc end`,
  ],
}