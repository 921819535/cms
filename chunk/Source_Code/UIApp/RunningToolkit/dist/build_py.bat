@echo off

set dir=%~dp0
set megdir=C:\Program Files\Microsoft\ILMerge\

if exist "%megdir%ILMerge.exe" (

  echo ������,���Ե�...
  cd %dir%

echo  /keyfile:%dir%\Source_Code\Spc.Core\ops.cms.snk>nul

"%megdir%ILMerge.exe" /ndebug /target:dll /out:%dir%ipy.dll^
 IronPython.dll Microsoft.Dynamic.dll Microsoft.Scripting.dll Microsoft.Scripting.Metadata.dll IronPython.Modules.dll
 

  echo ���!�����:%dirdist\%spc.dll

)


pause