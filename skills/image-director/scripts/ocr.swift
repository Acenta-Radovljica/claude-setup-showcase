// ocr.swift — extract text from an image via Apple's Vision framework.
// Usage: ocr <image-path>   (prints one recognized line per Vision observation)
// Native on macOS, no external install. Compiled-cached by ocr-check.sh.
import Foundation
import Vision
import AppKit

guard CommandLine.arguments.count > 1 else {
    FileHandle.standardError.write("usage: ocr <image-path>\n".data(using: .utf8)!)
    exit(64)
}
let path = CommandLine.arguments[1]
guard let img = NSImage(contentsOfFile: path),
      let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    FileHandle.standardError.write("ocr: cannot load image: \(path)\n".data(using: .utf8)!)
    exit(3)
}

let req = VNRecognizeTextRequest()
req.recognitionLevel = .accurate          // accurate beats fast for UI/label text
req.usesLanguageCorrection = true
// broad language hint set so brand/UI words in EN + common EU langs are read well
req.recognitionLanguages = ["en-US", "it-IT", "de-DE", "sl-SI", "hr-HR"]

let handler = VNImageRequestHandler(cgImage: cg, options: [:])
do {
    try handler.perform([req])
    for obs in (req.results ?? []) {
        if let top = obs.topCandidates(1).first { print(top.string) }
    }
} catch {
    FileHandle.standardError.write("ocr: vision error: \(error)\n".data(using: .utf8)!)
    exit(4)
}
