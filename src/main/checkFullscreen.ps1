param(
    [int]$ScreenWidth = 1920,
    [int]$ScreenHeight = 1080
)

$sig = @"
using System;
using System.Text;
using System.Runtime.InteropServices;

public class FullscreenChecker {
    [StructLayout(LayoutKind.Sequential)]
    public struct RECT {
        public int Left;
        public int Top;
        public int Right;
        public int Bottom;
    }

    [DllImport("user32.dll")]
    public static extern IntPtr GetForegroundWindow();

    [DllImport("user32.dll")]
    public static extern bool GetWindowRect(IntPtr hWnd, out RECT lpRect);

    [DllImport("user32.dll")]
    public static extern IntPtr GetShellWindow();

    [DllImport("user32.dll")]
    public static extern IntPtr GetDesktopWindow();

    [DllImport("user32.dll", SetLastError = true, CharSet = CharSet.Auto)]
    public static extern int GetClassName(IntPtr hWnd, StringBuilder lpClassName, int nMaxCount);

    public static bool CheckFullscreen(int screenW, int screenH) {
        IntPtr fg = GetForegroundWindow();
        if (fg == IntPtr.Zero) return false;
        if (fg == GetShellWindow() || fg == GetDesktopWindow()) return false;

        StringBuilder sb = new StringBuilder(256);
        GetClassName(fg, sb, 256);
        string cls = sb.ToString();
        if (cls == "Progman" || cls == "WorkerW" || cls == "Shell_TrayWnd" || cls == "Shell_SecondaryTrayWnd") return false;

        RECT r;
        if (GetWindowRect(fg, out r)) {
            int w = r.Right - r.Left;
            int h = r.Bottom - r.Top;
            // Matches or exceeds screen bounds and starts at top-left
            if (w >= screenW && h >= screenH && r.Left <= 0 && r.Top <= 0) {
                return true;
            }
        }
        return false;
    }
}
"@

try {
    Add-Type -TypeDefinition $sig -Language CSharp -ErrorAction SilentlyContinue
} catch {}

$result = [FullscreenChecker]::CheckFullscreen($ScreenWidth, $ScreenHeight)
if ($result) { "TRUE" } else { "FALSE" }
