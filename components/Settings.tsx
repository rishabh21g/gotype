"use client"
import  React  from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { ChevronDown, Monitor, Moon, Sun, X } from "lucide-react"
import { useSettings } from "@/context/SettingContext"
import { ACCENT_COLORS, FONT_SIZES } from "@/constants/settings"

export function SettingsSidebar() {
  const {  
    accent, setAccent,
    font, setFont, fontCssFamily,
    fontSize, setFontSize,
    showKeyboard, setShowKeyboard,
    soundEnabled, setSoundEnabled,
    clickSoundEnabled, setClickSoundEnabled,
    realtimeWpm, setRealtimeWpm,
    faahMode, setFaahMode,
    ghostMode, setGhostMode,
    shakeMode, setShakeMode,
    language, setLanguage,
    showDiacritics, setShowDiacritics,
    syntaxHighlighting, setSyntaxHighlighting,
    autoPair, setAutoPair,
    showLineNumbers, setShowLineNumbers,
    soundPackLoading, setSoundPackLoading,
    settingsLoaded,
  } = useSettings();
  const {setOpen} = useSidebar();

  return (
    <Sidebar 
      side="right" 
      variant="sidebar" 
      className="w-90 border-l bg-background" 
    >
      {/* HEADER */}
      <SidebarHeader className="flex flex-row items-center justify-between p-4 border-b">
        <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">Settings</h2>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setOpen(false)}>
          <X className="h-4 w-4" />
        </Button>
      </SidebarHeader>

      <SidebarContent className="p-4 overflow-y-auto custom-scrollbar">
        {/* THEME SETTINGS (Placeholder for theme context if you add it) */}
        <SidebarGroup>
          <div className="flex items-center justify-between">
            <SidebarGroupLabel className="text-xs font-semibold tracking-wider">THEME</SidebarGroupLabel>
            <div className="flex items-center rounded-full border bg-background p-1">
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full bg-accent text-accent-foreground">
                <Monitor className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-muted-foreground">
                <Sun className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full text-muted-foreground">
                <Moon className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </SidebarGroup>

        <SidebarSeparator className="my-4" />

        {/* ACCENT SETTINGS */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold tracking-wider mb-2">ACCENT</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex gap-2">
              {ACCENT_COLORS.map((color) => (
                <button 
                  key={color.id}
                  onClick={() => setAccent(color.id)}
                  className={`h-8 w-12 rounded  hover:opacity-80 transition-all ${
                    accent === color.id ? `ring-2  ring-offset-2 ring-offset-background` : ''
                  }`} 
                />
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-6" />

        {/* SOUND SETTINGS */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold tracking-wider">SOUND</SidebarGroupLabel>
          <p className="text-xs text-muted-foreground px-3 mb-4">Audio feedback when typing</p>
          
          <SidebarGroupContent className="space-y-4 px-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium uppercase">Keyboard Sound</p>
                <p className="text-xs text-muted-foreground">Play sounds as you type each key</p>
              </div>
              <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium uppercase">Click Sound</p>
                <p className="text-xs text-muted-foreground">Play a click sound on each keypress</p>
              </div>
              <Switch checked={clickSoundEnabled} onCheckedChange={setClickSoundEnabled} />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-6" />

        {/* INTERFACE SETTINGS */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold tracking-wider">INTERFACE</SidebarGroupLabel>
          <p className="text-xs text-muted-foreground px-3 mb-4">Customize the typing test layout and display</p>
          
          <SidebarGroupContent className="space-y-4 px-3">
            <div className="flex items-center justify-between">
              <div className="pr-4">
                <p className="text-sm font-medium uppercase">Show Keyboard</p>
                <p className="text-xs text-muted-foreground">Display a keyboard at the bottom of the screen</p>
              </div>
              <Switch checked={showKeyboard} onCheckedChange={setShowKeyboard} />
            </div>

            <div className="flex items-center justify-between">
              <div className="pr-4">
                <p className="text-sm font-medium uppercase">Realtime Stats</p>
                <p className="text-xs text-muted-foreground">Show WPM and accuracy while typing</p>
              </div>
              <Switch checked={realtimeWpm} onCheckedChange={setRealtimeWpm} />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-6" />

        {/* CODE SETTINGS */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold tracking-wider">CODE</SidebarGroupLabel>
          <p className="text-xs text-muted-foreground px-3 mb-4">Editor features for code snippets</p>

          <SidebarGroupContent className="space-y-4 px-3">
            <div className="flex items-center justify-between">
              <div className="pr-4">
                <p className="text-sm font-medium uppercase">Syntax Highlighting</p>
                <p className="text-xs text-muted-foreground">Colorize code keywords and strings</p>
              </div>
              <Switch checked={syntaxHighlighting} onCheckedChange={setSyntaxHighlighting} />
            </div>

            <div className="flex items-center justify-between">
              <div className="pr-4">
                <p className="text-sm font-medium uppercase">Auto Pair</p>
                <p className="text-xs text-muted-foreground">Automatically close brackets and quotes</p>
              </div>
              <Switch checked={autoPair} onCheckedChange={setAutoPair} />
            </div>

            <div className="flex items-center justify-between">
              <div className="pr-4">
                <p className="text-sm font-medium uppercase">Line Numbers</p>
                <p className="text-xs text-muted-foreground">Show line numbers alongside code</p>
              </div>
              <Switch checked={showLineNumbers} onCheckedChange={setShowLineNumbers} />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-6" />

        {/* MODES SETTINGS */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold tracking-wider">MODES</SidebarGroupLabel>
          <p className="text-xs text-muted-foreground px-3 mb-4">Fun visual effects and challenges</p>

          <SidebarGroupContent className="space-y-4 px-3">
            <div className="flex items-center justify-between">
              <div className="pr-4">
                <p className="text-sm font-medium uppercase">Shake Mode</p>
                <p className="text-xs text-muted-foreground">Screen shakes when you press a wrong key</p>
              </div>
              <Switch checked={shakeMode} onCheckedChange={setShakeMode} />
            </div>

            <div className="flex items-center justify-between">
              <div className="pr-4">
                <p className="text-sm font-medium uppercase">Faah Mode</p>
                <p className="text-xs text-muted-foreground">Words must be typed twice to be completed</p>
              </div>
              <Switch checked={faahMode} onCheckedChange={setFaahMode} />
            </div>

            <div className="flex items-center justify-between">
              <div className="pr-4">
                <p className="text-sm font-medium uppercase">Ghost Mode</p>
                <p className="text-xs text-muted-foreground">Next word stays hidden until current one is typed</p>
              </div>
              <Switch checked={ghostMode} onCheckedChange={setGhostMode} />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-6" />

        {/* FONT SETTINGS */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold tracking-wider">FONT</SidebarGroupLabel>
          
          <SidebarGroupContent className="mt-2 px-3">
            {/* You might want to convert this into a DropdownMenu component from shadcn */}
            <button className="flex items-center justify-between w-full p-2.5 border rounded-lg text-sm bg-background hover:bg-accent/50 transition-colors">
              <span>{font || 'Playfair Display'}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-6" />

        {/* FONT SIZE SETTINGS */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold tracking-wider">FONT SIZE</SidebarGroupLabel>
          
          <SidebarGroupContent className="mt-2 px-3">
            <div className="flex gap-2">
              {FONT_SIZES.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setFontSize(size.id)}
                  // Added 'uppercase' text class to keep the original UI look
                  className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-colors uppercase ${
                    fontSize === size.id 
                      ? 'bg-cyan-950/20 border-cyan-500 text-cyan-50' 
                      : 'bg-background hover:bg-accent/50 text-muted-foreground'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-6" />

        {/* LANGUAGE SETTINGS */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold tracking-wider">LANGUAGE</SidebarGroupLabel>
          
          <SidebarGroupContent className="mt-2 px-3">
             {/* You might want to convert this into a DropdownMenu component from shadcn */}
            <button className="flex items-center justify-between w-full p-2.5 border rounded-lg text-sm bg-background hover:bg-accent/50 transition-colors">
              <span className="capitalize">{language || 'English'}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-6" />

        {/* CACHE SETTINGS */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold tracking-wider">CACHE</SidebarGroupLabel>
          
          <SidebarGroupContent className="mt-2 px-3 mb-6">
            <Button variant="outline" className="w-full text-xs tracking-wider font-semibold">
              CLEAR SW CACHE
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  )
}